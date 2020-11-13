import React, { useState, useEffect } from 'react';
import { Stage, AppContext, } from 'react-pixi-fiber';
import * as PIXI from 'pixi.js';
import Background from '../../components/background';
import Menu from '../../components/menu';
import Reels from '../../components/reels';
import { background } from '../../assets';

function getScreenSize() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

function useWindowDimensions() {
  const [screenSize, setScreenSize] = useState(getScreenSize());

  useEffect(() => {
    function handleResize() {
      setScreenSize(getScreenSize());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return screenSize;
}

const SlotView = () => {
  const [spining, setSpining] = useState(false);
  const { height, width } = useWindowDimensions();
  
  const options = {
    backgroundColor: 0x1099bb,
    height: height - 3,
    width
  };
  
  return (
    <Stage options={options} >
      <AppContext.Consumer>
        {app => (

          <React.Fragment>
            <Background 
              app={app} 
              width={app.renderer.screen.width} 
              height={app.renderer.screen.height} 
              background={background} 
              x={0}
              y={0}
            />
            <Menu 
              app={app} 
              width={app.renderer.screen.width} 
              height={app.renderer.screen.height}
              onClick={() => setSpining(true)} 
            />
            <Reels 
              app={app} 
              spining={spining}
              width={app.renderer.screen.width} 
              height={app.renderer.screen.height} 
            />
          </React.Fragment>
        )}
      </AppContext.Consumer>
    </Stage>
  )
};

export default SlotView