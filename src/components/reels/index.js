import React from 'react';
import { Container } from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';
import Background from '../background';
import { wild, trolley, snake, lamp, gold, crate, boots, barrels, bag, cover } from '../../assets';

const Reels = ({ app, width, height }) => {
  const reelWidth = width >= 900 ? 160 : 120;
  const symbolSize = width >= 900 ? 140 : 100;
  const reelBackgroundWidth = reelWidth * 5;
  const reelBackgroundHeight = reelWidth * 3;
  const reelBackgroundX = width / 2 - reelBackgroundWidth / 2;
  const reelBackgroundY = height / 2 - reelBackgroundHeight / 2;
  const reelContainerX = width / 2 - (reelWidth * 5 / 2);
  const reelContainerY = width >= 900 ? height / 2 - 60 : height / 2 - 40;

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
  .add('cover', cover)
  .load(onAssetsLoaded);

  // onAssetsLoaded handler builds the example.
  function onAssetsLoaded() {
    // Create different slot symbols.
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
      rc.x = i * reelWidth;
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
        symbol.y = j * symbolSize;
        symbol.scale.x = symbol.scale.y = Math.min(symbolSize / symbol.width, symbolSize / symbol.height);
        symbol.x = Math.round((symbolSize - symbol.width) / 2 + 10);
        reel.symbols.push(symbol);
        rc.addChild(symbol);
      }
      reels.push(reel);
    }
    reelContainer.x = reelContainerX
    reelContainer.y = reelContainerY;
    app.stage.addChild(reelContainer);

    let running = false;

    // Function to start playing.
    function startPlay() {
      if (running) return;
      running = true;

      for (let i = 0; i < reels.length; i++) {
        const r = reels[i];
        const extra = Math.floor(Math.random() * 3);
        const target = r.position + 10 + i * 5 + extra;
        const time = 2500 + i * 600 + extra * 600;
        tweenTo(r, 'position', target, time, backout(0.5), null, i === reels.length - 1 ? reelsComplete : null);
      }
    }

    // Reels done handler.
    function reelsComplete() {
      running = false;
    }

    setTimeout(() => {
      startPlay()
    }, 1000)

    // Listen for animate update.
    app.ticker.add((delta) => {
      // Update the slots.
      for (let i = 0; i < reels.length; i++) {
        const r = reels[i];
        // Update blur filter y amount based on speed.
        // This would be better if calculated with time in mind also. Now blur depends on frame rate.
        r.blur.blurY = (r.position - r.previousPosition) * 8;
        r.previousPosition = r.position;

        // Update symbol positions on reel.
        for (let j = 0; j < r.symbols.length; j++) {
          const s = r.symbols[j];
          const prevy = s.y;
          s.y = ((r.position + j) % r.symbols.length) * symbolSize - symbolSize;
          if (s.y < 0 && prevy > symbolSize) {
            // Detect going over and swap a texture.
            // This should in proper product be determined from some logical reel.
            s.texture = slotTextures[Math.floor(Math.random() * slotTextures.length)];
            s.scale.x = s.scale.y = Math.min(symbolSize / s.texture.width, symbolSize / s.texture.height);
            s.x = Math.round((symbolSize - s.width) / 2 + 10);
          }
        }
      }
    });
  }

  // Very simple tweening utility function. This should be replaced with a proper tweening library in a real product.
  const tweening = [];
  function tweenTo(object, property, target, time, easing, onchange, oncomplete) {
    const tween = {
      object,
      property,
      propertyBeginValue: object[property],
      target,
      easing,
      time,
      change: onchange,
      complete: oncomplete,
      start: Date.now(),
    };

    tweening.push(tween);
    return tween;
  }
  // Listen for animate update.
  app.ticker.add((delta) => {
    const now = Date.now();
    const remove = [];
    for (let i = 0; i < tweening.length; i++) {
      const t = tweening[i];
      const phase = Math.min(1, (now - t.start) / t.time);

      t.object[t.property] = lerp(t.propertyBeginValue, t.target, t.easing(phase));
      if (t.change) t.change(t);
      if (phase === 1) {
        t.object[t.property] = t.target;
        if (t.complete) t.complete(t);
        remove.push(t);
      }
    }
    for (let i = 0; i < remove.length; i++) {
      tweening.splice(tweening.indexOf(remove[i]), 1);
    }
  });

  // Basic lerp funtion.
  function lerp(a1, a2, t) {
    return a1 * (1 - t) + a2 * t;
  }

  // Backout function from tweenjs.
  // https://github.com/CreateJS/TweenJS/blob/master/src/tweenjs/Ease.js
  function backout(amount) {
    return (t) => (--t * t * ((amount + 1) * t + amount) + 1);
  }
  
  return (
    <Container width={900} height={height - 500}>
      <Background
        // x={width / 2 - (reelWidth * 5 / 2)}
        x={reelBackgroundX}
        y={reelBackgroundY}
        background={cover}
        width={reelBackgroundWidth}
        height={reelBackgroundHeight} 
      />
    </Container>
  )
};

export default Reels;