import React from 'react';
import {  BrowserRouter as Router} from 'react-router-dom';
import {Provider} from 'unstated';
import MainLayout from './layouts/MainLayout';


function App() {
  return (
    <Provider>
        <Router>
          <MainLayout/>
        </Router>
    </Provider>
  );
}

export default App;
