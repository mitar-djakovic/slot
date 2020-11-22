import React from 'react';
import { Container, Sprite } from 'react-pixi-fiber';
import * as PIXI from "pixi.js";
import { symbolWidth } from "../../helpers/size";

let slotTextures = [];

const ReelSymbol = ({ symbol, position, columnPosition }) => {
  if (slotTextures.length === 0) {
    slotTextures = [
      PIXI.Texture.from('wild'),
      PIXI.Texture.from('trolley'),
      PIXI.Texture.from('snake'),
      PIXI.Texture.from('lamp'),
      PIXI.Texture.from('gold'),
      PIXI.Texture.from('crate'),
      PIXI.Texture.from('boots'),
      PIXI.Texture.from('barrels'),
      PIXI.Texture.from('bag')
    ];
  }

  const positionY = ((columnPosition + position) % 9) * symbolWidth() - symbolWidth() * 3;

  return (
    <Container y={positionY}>
      <Sprite
        texture={slotTextures[symbol]}
        width={symbolWidth()}
        height={symbolWidth()}
      />
    </Container>
  )
}

export default ReelSymbol;
