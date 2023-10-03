import React, { FC } from 'react';
import { connect } from 'react-redux';

import { Card, CardContent, Typography } from '@mui/material';

import { ApplicationState } from 'models/states';
import { getCurrentSystem } from 'store/current/selectors';

import './SystemOverlay.scss';

type Props = ReturnType<typeof mapStateToProps>;

const SystemOverlay: FC<Props> = ({ system }) => {

  return system && (
    <Card className="system-overlay">
      <CardContent>
        <Typography variant="h5" component="h2">
          {system.name}
        </Typography>
        <Typography color="textSecondary">
          {system.security}
        </Typography>
      </CardContent>
    </Card>
  )
}

const mapStateToProps = (state: ApplicationState) => ({
  system: getCurrentSystem(state),
});

export default connect(mapStateToProps)(SystemOverlay);