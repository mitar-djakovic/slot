import React from 'react';
import { Text, Container } from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';

const Data = ({ label, x, y, fontSize, data, interactive, incrementBetValue,decrementBetValue }) => {
  const style = new PIXI.TextStyle({
    fill: ['#ffffff', '#fff'],
    stroke: '#fff',
    fontSize,
    fontFamily: 'Smokum',
    letterSpacing: 2,
    align: 'center',
  })
  return (
    <Container>
      <Text
        text={label}
        x={x}
        y={y}
        style={{
          ...style,
        }} 
      />
      <Container>
        {interactive && <Text
          text='-'
          x={x - 20}
          y={y + 30}
          style={{
            ...style,
            fontSize: 40
          }}
          interactive 
          pointerdown={() => {
            decrementBetValue()
          }}
          buttonMode
        />}
        <Text
          text={data} 
          x={x}
          y={y + 40}
          style={style}
        />
        {interactive && <Text
          text='+'
          x={data > 9999 ? x + 70 : x + 40}
          y={y + 30}
          style={{
            ...style,
            fontSize: 40
          }}
          interactive
          pointerdown={() => {
            incrementBetValue()
          }}
          buttonMode
        />}
      </Container>
    </Container>
  )  
};

export default Data