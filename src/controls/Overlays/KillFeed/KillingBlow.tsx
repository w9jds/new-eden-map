import React, { FC, DetailedHTMLProps } from 'react';
import { Tooltip } from '@mui/material';

type Props = {
  img: DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>
}

const KillingBlow: FC<Props> = ({ img }) => img && (
  <div className="killing-blow">
    <Tooltip arrow disableInteractive title={img.alt} placement="top">
      <img className="killer" {...img}/>
    </Tooltip>
  </div>
);

export default KillingBlow;