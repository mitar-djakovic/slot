import React from 'react';
import { Container, Sprite } from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';
import Button from '../button';
import { play, maxbet, autoplay, base } from '../../assets';

const Menu = ({ app, width, height }) => {

  return (
    <Container
      position={{ x:0, y: height - 150}}
      width={width}
    >
      <Sprite
        texture={PIXI.Texture.from(base)}
        width={width}
        height={150}
        anchor={new PIXI.Point(0, 0)}
      />
      <Button 
        texture={PIXI.Texture.from(autoplay)}
        width={150}
        height={100}
        x={(width - 450) / 2}
        y={50} 
        interactive
        rotation={0}
      />
      <Button 
        texture={PIXI.Texture.from(play)}
        width={150}
        height={150} 
        x={(width - 150) / 2}
        y={-5}
        interactive
        app={app}
      />
      <Button 
        texture={PIXI.Texture.from(maxbet)}
        width={150}
        height={100}
        x={(width + 150) / 2}
        y={50}
        interactive 
        rotation={0}
      />
    </Container>
  )
};

export default Menu