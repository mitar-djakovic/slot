import React from 'react';
import { Container, Sprite } from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';
import Background from '../background';
import { cover, logo } from '../../assets';

const Reels = ({ app, width, height, reels }) => {
  const reelWidth = width >= 900 ? 160 : 120;
  const reelBackgroundWidth = reelWidth * 5;
  const reelBackgroundHeight = reelWidth * 3;
  const reelBackgroundX = width / 2 - reelBackgroundWidth / 2;
  const reelBackgroundY = height / 2 - reelBackgroundHeight / 2 - 50;
  
  return (
    <Container>
      <Background
        x={reelBackgroundX}
        y={reelBackgroundY}
        background={cover}
        width={reelBackgroundWidth}
        height={reelBackgroundHeight}
        zIndex={1} 
      />
      <Sprite
        texture={PIXI.Texture.from(logo)} 
        width={reelBackgroundWidth}
        height={100}
        x={reelBackgroundX}
        y={reelBackgroundY - 80}
        zIndex={5}
      />
      <Container
        x={reelBackgroundX}
        y={reelBackgroundY}
      >
        {reels.map(reel => {
          return (
            <Container
              x={reel.container.x}
              y={reel.container.y + 20}
            >
              {reel.symbols.map(symbol => {
                return (
                  <Sprite 
                    texture={PIXI.Texture.from(symbol.texture.textureCacheIds[0])}
                    x={15}
                    y={symbol.y}
                    width={symbol.width}
                    height={symbol.width}
                    filters={reel.blur + 100}
                  />
                )
              })}
            </Container>
          )
        })}
      </Container>
    </Container>
  )
};

export default Reels;