import React, { useState, useEffect } from 'react';
import { Stage, AppContext, } from 'react-pixi-fiber';
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
            <Background app={app} width={width} height={height} background={background} />
            <Menu 
              app={app} 
              width={width} 
              height={height}
            />
            <Reels app={app} />
          </React.Fragment>
        )}
      </AppContext.Consumer>
    </Stage>
  )
};

export default SlotView