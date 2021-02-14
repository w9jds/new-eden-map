import React, { Fragment } from 'react';

import { regions } from 'constants/regions';

import Region from './Region';

const NewEden = () => (
  <Fragment>
    {regions.map(region => <Region data={region} />)}
  </Fragment>
);

export default NewEden;