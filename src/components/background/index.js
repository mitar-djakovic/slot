import React from 'react';
import { Sprite } from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';

const Background = ({ background, width, height }) => {

  return (
    <Sprite
      anchor={new PIXI.Point(0)}
      texture={PIXI.Texture.from(background)}
      width={width}
      height={height}
    />
  )
};

export default Background