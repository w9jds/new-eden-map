import React, { FC, PropsWithChildren } from 'react';
import { ButtonBase } from '@mui/material';
import cn from 'classnames';

import './MenuItem.scss';

type Props = {
  className?: string;
  onClick?: (e: any) => void;
};

const MenuItem: FC<PropsWithChildren<Props>> = ({ className, onClick, children }) => (
  <ButtonBase component="div" className={cn('menu-item', className)} onClick={onClick}>
    {children}
  </ButtonBase>
);

export default MenuItem;
