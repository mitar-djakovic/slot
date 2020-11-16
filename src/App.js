import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { Stage, AppContext } from 'react-pixi-fiber';
import { store } from './redux/store';
import SlotView from './views/slot';

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

function App() {
  const { height, width } = useWindowDimensions();

  const options = {
    backgroundColor: 0x1099bb,
    height: height - 3,
    width
  };

  return (
    <Provider store={store}>
      <Stage options={options} >
        <AppContext.Consumer>
          {app => (
            <SlotView app={app} width={width} height={height} />
          )}
        </AppContext.Consumer>
      </Stage>
    </Provider>
  );
}

export default (App);
