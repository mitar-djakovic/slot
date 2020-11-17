import React from 'react';
import { Container } from 'react-pixi-fiber';
import { useDispatch } from 'react-redux';
import * as PIXI from 'pixi.js';
import Button from '../button';
import MenuData from '../menuData';
import { maxbet, autoplay, base } from '../../assets';
import { incrementBetValue, decrementBetValue, setMaxBet, autoBet} from '../../redux/actions';

const Menu = ({ app, width, height }) => {
  const dispatch = useDispatch();
  const baseWidth = width;
  const baseHeight = 150;

  let sideButtonWidth;
  let sideButtonHeight;
  let sideButtonY;
  let leftButtonX;
  let rightButtonX;
  let leftTextX;
  let rightTextX;
  let textY;

  if (width < 500) {
    sideButtonWidth = 60
    sideButtonHeight = 80
    sideButtonY = 70;
    leftButtonX = width / 2 - sideButtonWidth - sideButtonWidth / 2;
    rightButtonX = width / 2 + sideButtonWidth - sideButtonWidth / 2;
    leftTextX = leftButtonX + 10;
    rightTextX = rightButtonX + 10;
    textY = 100
  } else if (width >= 500 && width < 900) {
    sideButtonWidth = 80
    sideButtonHeight = 100
    sideButtonY = 70;
    leftButtonX = width / 2 - sideButtonWidth - sideButtonWidth / 2;
    rightButtonX = width / 2 + sideButtonWidth - sideButtonWidth / 2;
    leftTextX = leftButtonX + 20;
    rightTextX = rightButtonX + 20;
    textY = 100;
  } else {
    sideButtonWidth = 120
    sideButtonHeight = 100
    sideButtonY = 70;
    leftButtonX = width / 2 - sideButtonWidth - sideButtonWidth / 2;
    rightButtonX = width / 2 + sideButtonWidth - sideButtonWidth / 2;
    leftTextX = leftButtonX + 35;
    rightTextX = rightButtonX + 40;
    textY = 100; 
  }
  return (
    <Container
      position={{ x:0, y: height - 150}}
      width={width}
    >
      <MenuData
        texture={base}
        width={baseWidth}
        height={baseHeight}
        incrementBetValue={() => dispatch(incrementBetValue())}
        decrementBetValue={() => dispatch(decrementBetValue())}
      />
      <Button 
        texture={PIXI.Texture.from(autoplay)}
        width={sideButtonWidth}
        height={sideButtonHeight}
        x={leftButtonX}
        y={sideButtonY} 
        interactive
        text='AUTO PLAY'
        textX={leftTextX}
        textY={textY}
        onClick={() => dispatch(autoBet())}
      />
      <Button 
        texture={PIXI.Texture.from(maxbet)}
        width={sideButtonWidth}
        height={sideButtonHeight}
        x={rightButtonX}
        y={sideButtonY}
        interactive 
        text='MAX BET'
        textX={rightTextX}
        textY={textY}
        onClick={() => dispatch(setMaxBet())}
      />
    </Container>
  )
};

export default Menu