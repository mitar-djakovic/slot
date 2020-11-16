import React, { useState, useEffect } from 'react';
import { Container } from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';
import Background from '../../components/background';
import Menu from '../../components/menu';
import Reels from '../../components/reels';
import { background, wild, trolley, snake, lamp, gold, crate, boots, barrels, bag } from '../../assets';

const SlotView = ({ app, width, height }) => {
  const [spining, setSpining] = useState(true);
  const [reels, setReels] = useState([]);
  
  const reelWidth = width >= 900 ? 160 : 120;
  const symbolSize = width >= 900 ? 140 : 100;
  const reelBackgroundWidth = reelWidth * 5;
  const reelBackgroundHeight = reelWidth * 3;
  const reelBackgroundX = width / 2 - reelBackgroundWidth / 2;
  const reelBackgroundY = height / 2 - reelBackgroundHeight / 2 - 50;
  const reelContainerX = width / 2 - (reelWidth * 5 / 2);
  const reelContainerY = width >= 900 ? height / 2 - 100 : height / 2 - 150;

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

  useEffect(() => {
    buildReels();
  }, [])

  function buildReels() {
    const reels = [];

    for (let i = 0; i < 5; i++) {
      const rc = new PIXI.Container();
      rc.x = i * reelWidth;

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
        symbol.y = j * symbolSize ;
        symbol.x = Math.round((symbolSize - symbol.width) / 2 + 10);
        symbol.width = symbolSize;
        
        reel.symbols.push(symbol);
        rc.addChild(symbol);
      }

      reels.push(reel);
    }
    
    setReels(reels);

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
  };
  let running = false;

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
  };

  setTimeout(() => {
    startPlay();
  }, 3000);

  // Reels done handler.
  function reelsComplete() {
    running = false;
  }

  // Very simple tweening utility function. This should be replaced with a proper tweening library in a real product.
  const tweening = [];
  function tweenTo(object, property, target, time, easing, onchange, oncomplete) {
    console.log('ovo se pokrece na start')
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
  
  console.log('tweening', tweening);
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

  function startGame() {
    console.log('startGame');

    setTimeout(() => {
      stopGame()
    }, 3000)
  };

  function stopGame() {
    console.log('stopGame')
  }
  
  return (
    <Container>
      <React.Fragment>
        <Background 
          app={app} 
          width={app.renderer.screen.width} 
          height={app.renderer.screen.height} 
          background={background} 
          x={0}
          y={0}
          zIndex={1}
        />
        <Menu 
          app={app} 
          width={app.renderer.screen.width} 
          height={app.renderer.screen.height}
          onClick={() => startGame()}
        />
        <Reels 
          app={app} 
          width={app.renderer.screen.width} 
          height={app.renderer.screen.height} 
          reels={reels}
        />
      </React.Fragment>
    </Container>
  )
};

export default SlotView