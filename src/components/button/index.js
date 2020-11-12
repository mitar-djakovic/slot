import React from 'react';
import { Sprite } from 'react-pixi-fiber';

const Button = ({ texture, width, height, x, y }) => {

  return (
    <Sprite
      texture={texture}
      width={width}
      height={height}
      x={x}
      y={y}
    />
  )
};

export default Button