import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import SlotView from './views/slot';
import { background } from './assets';

function App() {
  
  return (
    <Provider store={store}>
      <div style={{ 
        // display: 'flex', 
        // alignItems: 'center', 
        // justifyContent: 'center', 
        // width: '100%', 
        // height: '100vh',
        // backgroundImage: `url(${background})`,
        // backgroundSize: 'cover' 
      }}>
        <SlotView />
      </div>
    </Provider>
  );
}

export default App;
