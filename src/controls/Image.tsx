import React, { FC, DetailedHTMLProps } from 'react';

type ImageProps = DetailedHTMLProps<React.ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement>;

const Image: FC<ImageProps> = (props) => {


  return (
    <img {...props} />
  )
}