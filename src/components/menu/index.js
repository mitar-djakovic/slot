import React from 'react';
import { Container, Sprite } from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';
import Button from '../button';
import { play, maxbet, autoplay, base } from '../../assets';

const Menu = ({ width, height }) => {
  return (
    <Container
      position={{ x:0, y: height - 150}}
      width={width}
    >
      <Sprite
        texture={new PIXI.Texture.from(base)}
        width={width}
        height={150}
        anchor={new PIXI.Point(0, 0)}
      />
      <Button 
        texture={new PIXI.Texture.from(autoplay)}
        width={150}
        height={100}
        x={(width - 450) / 2}
        y={50} 
      />
      <Button 
        texture={new PIXI.Texture.from(play)}
        width={150}
        height={150} 
        x={(width - 150) / 2}
        y={-5}
      />
      <Button 
        texture={new PIXI.Texture.from(maxbet)}
        width={150}
        height={100}
        x={(width + 150) / 2}
        y={50} 
      />
    </Container>
  )
};

export default Menu