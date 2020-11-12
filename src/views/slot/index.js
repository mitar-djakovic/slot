import React, { useState, useEffect } from 'react';
import { Stage } from 'react-pixi-fiber';
import Background from '../../components/background';
import Menu from '../../components/menu';
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
    <Stage style={{ position: 'absolute' }} options={options} >
      <Background width={width} height={height} background={background} />
      <Menu width={width} height={height} />
    </Stage>
  )
};

export default SlotView