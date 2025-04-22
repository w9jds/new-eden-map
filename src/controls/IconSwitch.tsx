import React, { FC, PropsWithChildren, useMemo, useState } from 'react';

import './IconSwitch.scss';

type Props = {
  initialState?: number,
  onChange?: (index: number) => void,
  className?: string,
}

const IconSwitch: FC<PropsWithChildren<Props>> = ({
  initialState = 0,
  children,
  onChange,
  className,
}) => {
  const [state, setState] = useState(
    Math.max(0, Math.min(React.Children.count(children) - 1, initialState))
  );

  const handleIconClick = (index) => {
    if (index !== state) {
      setState(index);
      if (onChange) {
        onChange(index);
      }
    }
  };

  const stageClassName = `stage-${state}`;

  const buttons = useMemo(() =>
    React.Children.map(children, (child, index) => {
      if (React.isValidElement(child)) {
        return (
          <button
            key={index}
            type="button"
            className={`icon-switch-option ${state === index ? 'active' : ''}`}
            onClick={() => handleIconClick(index)}
            role="radio"
            aria-checked={state === index}
            aria-label={`Option ${index + 1}`}
            tabIndex={state === index ? 0 : -1}
          >
            {child}
          </button>
        );
      }

      return child;
    }),
    [children, state, handleIconClick]
  );

  return (
    <div className={`icon-switch-container ${stageClassName} ${className}`} role="radiogroup">
      <div className="icon-switch-bubble" aria-hidden="true"></div>
      <div className="icon-switch-options">
        {buttons}
      </div>
    </div>
  );
}

export default IconSwitch;
