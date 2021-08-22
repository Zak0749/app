import { AutorenewRounded } from '@material-ui/icons';
import React from 'react';
import './css/Loading.css';

function Loading() {
  return (
    <div className="page loading-page">
      <AutorenewRounded className="loading" />
    </div>
  );
}

export default Loading;
