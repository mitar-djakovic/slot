import React from 'react';
import { Container, Sprite } from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';
import Button from '../button';
import { play, maxbet, autoplay, base } from '../../assets';

const Menu = ({ app, width, height, onClick }) => {
  const baseWidth = width;
  const baseHeight = 150;

  const playWidth = width >= 900 ? 150 : 100;
  const playHight = width >= 900 ? 150 : 100;
  const playX = width >= 900 ? width / 2 - playWidth / 2 : width / 2 - playWidth / 2;
  const playY = width >= 900 ? -5 : 30;
  
  const sideButtonWidth = 100;
  const sideButtonHeight = 100;
  const sideButtonY = 50;
  const leftButtonX = width >= 900 ? width / 2 - 180  : width / 2 - 150;
  const rightButtonX = width >= 900 ? width / 2 + 80  : width / 2 + 50;

  return (
    <Container
      position={{ x:0, y: height - 150}}
      width={width}
    >
      <Sprite
        texture={PIXI.Texture.from(base)}
        width={baseWidth}
        height={baseHeight}
        anchor={new PIXI.Point(0, 0)}
      />
      <Button 
        texture={PIXI.Texture.from(autoplay)}
        width={sideButtonWidth}
        height={sideButtonHeight}
        x={leftButtonX}
        y={sideButtonY} 
        interactive
      />
      <Button 
        texture={PIXI.Texture.from(play)}
        width={playWidth}
        height={playHight} 
        x={playX}
        y={playY}
        interactive
        app={app}
        onClick={onClick}
      />
      <Button 
        texture={PIXI.Texture.from(maxbet)}
        width={sideButtonWidth}
        height={sideButtonHeight}
        x={rightButtonX}
        y={sideButtonY}
        interactive 
      />
    </Container>
  )
};

export default Menu