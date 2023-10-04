import { ActionCreator } from 'redux';
import { eventChannel, buffers, Channel } from 'redux-saga';
import { put, take, call, fork, cancelled } from 'redux-saga/effects';
import {
  DatabaseReference, Query, EventType,
  DataSnapshot, off, onChildAdded, onChildChanged,
  onChildMoved, onChildRemoved, onValue, Unsubscribe,
} from 'firebase/database';

export type Payload = {
  snapshot: DataSnapshot,
  value: any
};

export type SyncOptions = {
  successAction: ActionCreator<any>;
  errorAction?: ActionCreator<any>;
  transform?: (data: Payload) => any;
};

function createChannel(ref: DatabaseReference | Query, event: EventType) {
  const channel = eventChannel(emit => {
    const callback = (snapshot: DataSnapshot, previousChildName?: string) => {
      emit({
        snapshot: snapshot,
        value: snapshot.val(),
      });
    };

    let listener: Unsubscribe;
    switch(event) {
      case 'child_added':
        listener = onChildAdded(ref, callback);
        break;
      case 'child_changed':
        listener = onChildChanged(ref, callback);
        break;
      case 'child_moved':
        listener = onChildMoved(ref, callback);
        break;
      case 'child_removed':
        listener = onChildRemoved(ref, callback);
        break;
      default:
        listener = onValue(ref, callback);
        break;
    }

    return () => off(ref, event, listener);
  }, buffers.expanding(1));

  return channel;
}

const defaultTransform = (data: Payload) => data.snapshot;

export function* sync(ref: DatabaseReference | Query, options: SyncOptions, event: EventType) {
  const channel = yield call(createChannel, ref, event);

  yield fork(syncChannel, channel, {
    transform: defaultTransform,
    ...options,
  });
}

function* syncChannel(channel: Channel<any>, options: SyncOptions) {
  const { successAction, errorAction, transform } = options;

  try {
    while (true) {
      const data = yield take(channel);
      const transformedData = transform ? transform(data) : data;
      yield put(successAction(transformedData));
    }
  } catch (err) {
    /* eslint-disable no-console */
    if (errorAction) {
      yield put(errorAction(err));
    }
    else {
      console.error(
        'The following error has been ignored because no `failureActionCreator` has been set:',
        err,
      );
    }
  } finally {
    if (yield cancelled()) {
      channel.close();
    }
  }
}