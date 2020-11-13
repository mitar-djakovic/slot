import React from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import SlotView from './views/slot';

function App() {
  
  return (
    <Provider store={store}>
      <SlotView />
    </Provider>
  );
}

export default (App);
