import React, {useEffect, useRef, useState} from 'react';
import {Container} from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';
import Background from '../../components/background';
import Menu from '../../components/menu';
import Reels from "../../components/reels";
import {countElements} from "../../helpers/arrays";

window.PIXI = PIXI;

const SlotView = ({app, width, height }) => {
  // State
  const tweening = useRef([]);
  const [reels, setReels] = useState([]);
  const [spinPositions, setSpinPositions] = useState([{
    position: 0,
    previousPosition: 0
  }, {
    position: 0,
    previousPosition: 0
  }, {
    position: 0,
    previousPosition: 0
  }, {
    position: 0,
    previousPosition: 0
  }, {
    position: 0,
    previousPosition: 0
  }]);
  const [loaded, setLoaded] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const initialWinCheck = useRef(false);

  const randomizeSymbols = () => {
    const reels = [];

    for (let i = 0; i < 5; i++) {
      const reelColumn = [];

      // Build the symbols
      for (let j = 0; j < 9; j++) {
        reelColumn.push(Math.floor(Math.random() * 9));
      }
      reels.push(reelColumn);
    }

    setReels(reels);
  }

  useEffect(() => {
    app.loader
      .add('background', '/assets/background.png')
      .add('play', '/assets/button.png')
      .add('maxbet', '/assets/maxbet.png')
      .add('autoplay', '/assets/autoplay.png')
      .add('barrels', '/assets/barrels.png')
      .add('wild', '/assets/wild.png')
      .add('trolley', '/assets/trolley.png')
      .add('snake', '/assets/snake.png')
      .add('lamp', '/assets/lamp.png')
      .add('gold', '/assets/gold.png')
      .add('crate', '/assets/crate.png')
      .add('boots', '/assets/boots.png')
      .add('bag', '/assets/bag.png')
      .add('base', '/assets/base.png')
      .add('cover', '/assets/cover.png')
      .add('logo', '/assets/logo.png')
      .load(() => {
        setLoaded(true);
      });

    randomizeSymbols();

    // Listen for animate update.
    app.ticker.add((delta) => {
      const now = Date.now();
      const remove = [];
      const tempSpinPositions = [...spinPositions.map(sp => ({...sp}))];

      for (let i = 0; i < tweening.current.length; i++) {
        const t = tweening.current[i];
        const phase = Math.min(1, (now - t.start) / t.time);

        tempSpinPositions[t.reelColumnIndex].position = lerp(t.propertyBeginValue, t.target, t.easing(phase));
        // t.object[t.property] = lerp(t.propertyBeginValue, t.target, t.easing(phase));
        if (t.change) t.change(t);
        if (phase === 1) {
          tempSpinPositions[t.reelColumnIndex].position = t.target;
          if (t.complete) t.complete(t);
          remove.push(t);
        }
      }

      // console.log(tempSpinPositions);

      if (JSON.stringify(spinPositions) !== JSON.stringify(tempSpinPositions)) {
        setSpinPositions(tempSpinPositions);
      }

      for (let i = 0; i < remove.length; i++) {
        tweening.current.splice(tweening.current.indexOf(remove[i]), 1);
      }
    });
  }, []);

  const checkWin = () => {
    const winLines = [
      [reels[0][3], reels[1][3], reels[2][3], reels[3][3], reels[4][3]],
      [reels[0][4], reels[1][4], reels[2][4], reels[3][4], reels[4][4]],
      [reels[0][5], reels[1][5], reels[2][5], reels[3][5], reels[4][5]],
    ];

    const winLinesOccurrences = winLines.map(countElements);

    winLinesOccurrences.forEach((winLine, index) => {
      Object.entries(winLine).forEach(([symbol, occurrences]) => {
        if (occurrences > 2) {
          console.log(`WIN ON LINE ${index} SYMBOL ${symbol}`);
        }
      });
    });
  }

  useEffect(() => {
    if (!isSpinning && initialWinCheck.current) {
      checkWin();
    }

    if (!initialWinCheck.current) {
      initialWinCheck.current = true;
    }
  }, [isSpinning]);

  const onSpinEnd = () => {
    setIsSpinning(false);
  }

  const onSpin = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    randomizeSymbols();

    for (let i = 0; i < reels.length; i++) {
      const extra = Math.floor(Math.random() * 3);
      let target = spinPositions[i].position + 10 + i * 5 + extra;
      target = target + 9 - target % 9;
      const time = 2500 + i * 600 + extra * 600;

      // reelColumnIndex, target, time, easing, onchange, oncomplete
      tweenTo(i, target, time, backout(0.5), null, i === reels.length - 1 ? onSpinEnd : null);
    }
  }

  function tweenTo(reelColumnIndex, target, time, easing, onchange, oncomplete) {
    const tween = {
      reelColumnIndex,
      propertyBeginValue: spinPositions[reelColumnIndex].position,
      target,
      easing,
      time,
      change: onchange,
      complete: oncomplete,
      start: Date.now(),
    };

    tweening.current.push(tween);
    return tween;
  }

  // Basic lerp funtion.
  function lerp(a1, a2, t) {
    return a1 * (1 - t) + a2 * t;
  }

  // Backout function from tweenjs.
  // https://github.com/CreateJS/TweenJS/blob/master/src/tweenjs/Ease.js
  function backout(amount) {
    return (t) => (--t * t * ((amount + 1) * t + amount) + 1);
  }

  if (!loaded) return null;

  return (
    <Container>
      <React.Fragment>
        <Background
          app={app}
          width={app.renderer.screen.width}
          height={app.renderer.screen.height}
          background={'background'}
          x={0}
          y={0}
          zIndex={1}
        />
        <Menu
          app={app}
          width={app.renderer.screen.width}
          height={app.renderer.screen.height}
          onSpinClick={onSpin}
        />
        <Reels reels={reels} spinPositions={spinPositions} width={width} height={height} />
      </React.Fragment>
    </Container>
  )
};

export default SlotView
