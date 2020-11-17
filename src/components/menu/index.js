import React from 'react';
import { Container, Sprite } from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';
import Button from '../button';
import { maxbet, autoplay, base } from '../../assets';

const Menu = ({ app, width, height }) => {
  const baseWidth = width;
  const baseHeight = 150;

  let sideButtonWidth;
  let sideButtonHeight;
  let sideButtonY;
  let leftButtonX;
  let rightButtonX;

  if (width < 500) {
    sideButtonWidth = 60
    sideButtonHeight = 80
    sideButtonY = 70;
    leftButtonX = width / 2 - sideButtonWidth - sideButtonWidth / 2;
    rightButtonX = width / 2 + sideButtonWidth - sideButtonWidth / 2;
  } else if (width >= 500 && width < 900) {
    sideButtonWidth = 80
    sideButtonHeight = 100
    sideButtonY = 70;
    leftButtonX = width / 2 - sideButtonWidth - sideButtonWidth / 2;
    rightButtonX = width / 2 + sideButtonWidth - sideButtonWidth / 2;
  } else {
    sideButtonWidth = 80
    sideButtonHeight = 100
    sideButtonY = 70;
    leftButtonX = width / 2 - sideButtonWidth - sideButtonWidth / 2;
    rightButtonX = width / 2 + sideButtonWidth - sideButtonWidth / 2;
  }
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
      {/* <Button 
        texture={PIXI.Texture.from(play)}
        width={playWidth}
        height={playHight} 
        x={playX}
        y={playY}
        interactive
        app={app}
        onClick={onClick}
      /> */}
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