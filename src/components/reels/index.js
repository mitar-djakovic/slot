import React, {useCallback, useState} from 'react';
import {Container, Sprite} from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';
import Background from '../background';
import { symbolWidth } from '../../helpers/size';
import ReelColumn from "./reelColumn";

const Reels = ({ reels, spinPositions, width, height }) => {
  const reelWidth = symbolWidth();
  let logoWidth;
  let logoHeight;
  let logoX;

  if (width < 600) {
    logoWidth = width;
    logoHeight = 90;
    logoX = 0;
  } else if (width >= 600 && width < 900) {
    logoWidth = reelWidth * 5
    logoHeight = 100;
    logoX = width / 2 - logoWidth / 2;
  } else {
    logoHeight = 100;
    logoWidth = reelWidth * 5;
    logoX = width / 2 - logoWidth / 2;
  }
  const reelBackgroundWidth = reelWidth * 5;
  const reelBackgroundHeight = reelWidth * 3;
  const reelBackgroundX = width / 2 - reelBackgroundWidth / 2;
  const reelBackgroundY = height / 2 - reelBackgroundHeight / 2 - 50;

  const [maskRef, setMaskRef] = useState(null);
  const onMaskRefChange = useCallback((node) => {
    setMaskRef(node);
  }, []);

  return (
    <React.Fragment>
      <Container
        name={'Reel'}
        mask={maskRef}
      >
        <Background
          name={'ReelBackground'}
          x={reelBackgroundX}
          y={reelBackgroundY}
          background={'cover'}
          width={reelBackgroundWidth}
          height={reelBackgroundHeight}
          zIndex={1}
        />
          <Sprite
            texture={PIXI.Texture.WHITE}
            x={reelBackgroundX}
            y={reelBackgroundY}
            width={reelBackgroundWidth}
            height={reelBackgroundHeight}
            ref={onMaskRefChange}
          />
          <Container
            x={reelBackgroundX}
            y={reelBackgroundY}
          >
            {reels.map((reelColumn, position) => (
              <ReelColumn
                symbols={reelColumn}
                position={position}
                key={`reelColumn#${position}`}
                columnPosition={spinPositions[position]}
              />
            ))}
          </Container>
        </Container>
      <Sprite
        texture={PIXI.Texture.from('logo')}
        width={logoWidth}
        height={logoHeight}
        x={logoX}
        y={reelBackgroundY - 80}
        zIndex={5}
      />
    </React.Fragment>
  )
};

export default Reels;
