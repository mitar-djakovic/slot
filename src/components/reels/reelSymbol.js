import React from 'react';
import { Container, Sprite } from 'react-pixi-fiber';
import * as PIXI from "pixi.js";
import { symbolWidth } from "../../helpers/size";

const ReelSymbol = ({ symbol, position, columnPosition }) => {

  const positionY = ((columnPosition + position) % 9) * symbolWidth() - symbolWidth() * 3;

  return (
    <Container y={positionY}>
      <Sprite
        texture={PIXI.Texture.from(symbol.name)}
        width={symbolWidth()}
        height={symbolWidth()}
      />
    </Container>
  )
}

export default ReelSymbol;
