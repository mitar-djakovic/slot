import React, { useEffect } from 'react';
import { Container } from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';
import Background from '../../components/background';
import Menu from '../../components/menu';
import { background, wild, trolley, snake, lamp, gold, crate, boots, barrels, bag, play, cover, logo } from '../../assets';

const SlotView = ({ app, width, height }) => {
  // Dimenstions
  let reelWidth;
  let symbolSize;
  let reelsBackgroundWidth;
  let reelsBackgroundHeight;
  let reelsBackgroundX;
  let reelsBackgroundY;
  let reelContainerX;
  let reelContainerY;
  let playButtonWidth;
  let playButtonX;
  let playButtonY;
  let logoWidth;
  let logoHeight;
  let logoX;
  let logoY;
  
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
    .load(onAssetsLoaded);
  
  if (width < 500) {
    console.log('telefoni')
    reelsBackgroundWidth = width;
    reelWidth = width / 5;
    symbolSize = width / 5 - 20;
    reelsBackgroundHeight = reelWidth * 3;
    reelsBackgroundX = 0;
    reelsBackgroundY = height / 2 - reelsBackgroundHeight / 2 - 50;
    reelContainerX = 10;
    reelContainerY = reelsBackgroundY + 100;
    playButtonWidth = 80
    playButtonX = width / 2 - playButtonWidth / 2;
    playButtonY = height - playButtonWidth - 10;
    logoWidth = width;
    logoHeight = 60;
    logoX = 0;
    logoY = reelsBackgroundY - reelWidth / 2;
  } else if (width >= 500 && width < 900) {
    console.log('tableti')
    reelWidth = 100;
    symbolSize = 80;
    reelsBackgroundWidth = reelWidth * 5;
    reelsBackgroundHeight = reelWidth * 3;
    reelsBackgroundX = width / 2 - reelsBackgroundWidth / 2;
    reelsBackgroundY = height / 2 - reelsBackgroundHeight / 2 - 50;
    reelContainerX = reelsBackgroundX + 10;
    reelContainerY = reelsBackgroundY + 100;
    playButtonWidth = 100;
    playButtonX = width / 2 - playButtonWidth / 2;
    playButtonY = height - playButtonWidth - 10;
    logoWidth = reelsBackgroundWidth;
    logoHeight = 60;
    logoX = width / 2 - logoWidth / 2;
    logoY = reelsBackgroundY - reelWidth / 2;
  } else {
    console.log('kompjuteri');
    reelWidth = 160;
    symbolSize = 120;
    reelsBackgroundWidth = reelWidth * 5;
    reelsBackgroundHeight = reelWidth * 3;
    reelsBackgroundX = width / 2 - reelsBackgroundWidth / 2;
    reelsBackgroundY = height / 2 - reelsBackgroundHeight / 2 - 50;
    reelContainerX = reelsBackgroundX + 20;
    reelContainerY = reelsBackgroundY + 150;
    playButtonWidth = 100;
    playButtonX = width / 2 - playButtonWidth / 2;
    playButtonY = height - playButtonWidth - 10;
    logoWidth = reelsBackgroundWidth;
    logoHeight = 80;
    logoX = width / 2 - logoWidth / 2;
    logoY = reelsBackgroundY - symbolSize / 2;
  }
  useEffect(() => {


    return () => {
      console.log('componentDidUnmount')
    }
  }, [])

  // onAssetsLoaded handler builds the example.
  const reels = [];
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
    const reelContainer = new PIXI.Container();
    for (let i = 0; i < 5; i++) {
      const rc = new PIXI.Container();
      rc.x = i * reelWidth;
      reelContainer.addChild(rc);
      
      reelContainer.x = reelContainerX;
      reelContainer.y = reelContainerY;
      reelContainer.zIndex = 5;

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
        symbol.x = Math.round((symbolSize - symbol.width) / 2);
        reel.symbols.push(symbol);
        rc.addChild(symbol);
      }
      reels.push(reel);
    }
    app.stage.addChild(reelContainer);

    const playButton = new PIXI.Sprite.from(play);
    playButton.width = playButtonWidth;
    playButton.height = playButtonWidth;
    playButton.x = playButtonX;
    playButton.y = playButtonY;
    playButton.interactive = true;
    playButton.buttonMode = true;

    app.stage.addChild(playButton);
    playButton.addListener('pointerdown', () => {
      startPlay();
    });

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
            s.x = Math.round((symbolSize - s.width) / 2);
          }
        }
      }
    });
  };

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
        />
        <Background
          app={app}
          width={reelsBackgroundWidth} 
          height={reelsBackgroundHeight} 
          background={cover}
          x={reelsBackgroundX}
          y={reelsBackgroundY}
          zIndex={2} 
        />
        <Background
          width={logoWidth}
          height={logoHeight}
          background={logo}
          x={logoX}
          y={logoY}
          zIndex={10} 
        />
      </React.Fragment>
    </Container>
  )
};

export default SlotView