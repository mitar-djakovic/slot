import React from 'react';
import { Sprite, Text } from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';

const Button = ({
  texture, width, height, x, y, interactive, onClick, text, textX, textY
}) => {
  const style = new PIXI.TextStyle({
    fill: ['#ffffff', '#fff'],
    stroke: '#fff',
    fontSize: 20,
    fontFamily: 'Smokum',
    letterSpacing: 2,
    align: 'center',
    wordWrapWidth: 50,
    wordWrap: true
  })
  return (
    <React.Fragment>
      <Text
        text={text}
        style={style}
        x={textX || 0}
        y={textY || 0}
        zIndex={2}
      />
      <Sprite
        texture={texture}
        width={width}
        height={height}
        x={x}
        y={y || 0}
        interactive={interactive}
        pointerdown={() => {
          onClick()
        }}
        zIndex={1}
        buttonMode
      />
    </React.Fragment>
  )
};

export default Button
