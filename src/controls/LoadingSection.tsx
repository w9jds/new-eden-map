import React from 'react';
import { Divider, CircularProgress } from '@mui/material';
import './LoadingSection.scss';

export const LoadingSection = () => (
  <>
    <Divider />
    <div className="loading">
      <CircularProgress size="30px" />
    </div>
  </>
);