import React from 'react';
import { Sprite } from 'react-pixi-fiber';
import { useSelector } from "react-redux";
import Data from '../data';
import * as PIXI from 'pixi.js';

const MenuData = ({ texture, width, height, incrementBetValue,decrementBetValue }) => {
  const creedits = useSelector(state => state.slot.creedits);;
  const bet = useSelector(state => state.slot.bet);
  
  let betX;
  let coinsX;
  let sectionWidth;
  let fontSize;
  let labelY;

  if (width < 500) {
    fontSize = 16;
    sectionWidth = width / 2;
    betX = sectionWidth - 150;
    coinsX = sectionWidth + 120;
    labelY = height / 2; 
  } else if (width >= 500 && width < 900) {
    fontSize = 20;
    sectionWidth = width;
    betX = 100;
    coinsX = sectionWidth - 150;
    labelY = height / 2 - 2;
  } else {
    fontSize = 26
    sectionWidth = width;
    betX = 150;
    coinsX = sectionWidth - 200;
    labelY = height / 2 - 8;
  }

  return (
    <React.Fragment>
      <Sprite
        texture={PIXI.Texture.from(texture)}
        width={width}
        height={height}
        anchor={new PIXI.Point(0, 0)}
      />
      <Data
        label='BET'
        data={bet}
        x={betX}
        y={labelY} 
        fontSize={fontSize}
        interactive
        incrementBetValue={incrementBetValue}
        decrementBetValue={decrementBetValue}
      />
      <Data
        label='COINS'
        data={creedits}
        x={coinsX}
        y={labelY}  
        fontSize={fontSize}
      />
    </React.Fragment>
  )
}

export default MenuData