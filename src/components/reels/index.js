import React from 'react';
import { Container } from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';
import { wild, trolley, snake, lamp, gold, crate, boots, barrels, bag } from '../../assets';

const Reels = ({ app }) => {
  const onLoad = () => {
    const REEL_WIDTH = 160;
    const SYMBOL_SIZE = 150;
    
    const slotTextures = [
      PIXI.Texture.from(wild),
      PIXI.Texture.from(trolley),
      PIXI.Texture.from(snake),
      PIXI.Texture.from(lamp),
      PIXI.Texture.from(gold),
      PIXI.Texture.from(crate),
      PIXI.Texture.from(boots),
      PIXI.Texture.from(barrels),
      PIXI.Texture.from(bag)
    ];
    
    // Build the reels
    const reels = [];
    const reelContainer = new PIXI.Container();
    
    for (let i = 0; i < 5; i++) {
      const rc = new PIXI.Container();
      rc.x = i * REEL_WIDTH;
      reelContainer.addChild(rc);

      const reel = {
        container: rc,
        symbols: [],
        position: 0,
        previousPosition: 0,
        blur: new PIXI.filters.BlurFilter(),
      };
      reel.blur.blurX = 0;
      reel.blur.blurY = 0;
      rc.filters = [reel.blur];

      // Build the symbols
      for (let j = 0; j < 3; j++) {
        const symbol = new PIXI.Sprite(slotTextures[Math.floor(Math.random() * slotTextures.length)]);
        // Scale the symbol to fit symbol area.
        symbol.y = j * SYMBOL_SIZE;
        symbol.scale.x = symbol.scale.y = Math.min(SYMBOL_SIZE / symbol.width, SYMBOL_SIZE / symbol.height);
        symbol.x = Math.round((SYMBOL_SIZE - symbol.width) / 2);
        reel.symbols.push(symbol);
        rc.addChild(symbol);
      }
      reels.push(reel);
    }
    app.stage.addChild(reelContainer);
  }

  app.loader
    .add('wild', wild)
    .add('trolley', trolley)
    .add('snake', snake)
    .add('lamp', lamp)
    .add('gold', gold)
    .add('crate', crate)
    .add('boots', boots)
    .add('barrels', barrels)
    .add('bag', bag)
    .load(onLoad);

  return (
    <Container width={500} height={500} >

    </Container>
  )
};

export default Reels;