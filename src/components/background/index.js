import React from 'react';
import { Sprite } from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';

const Background = ({ background, width, height, x, y, zIndex }) => {
  return (
    <Sprite
      x={x}
      y={y}
      texture={PIXI.Texture.from(background)}
      width={width}
      height={height}
      zIndex={zIndex}
    />
  )
};

export default Background