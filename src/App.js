import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';

import MainScreen from './screens/MainScreen';

const App = () => (
  <div>
    <Routes>
      <Route path="/" element={<MainScreen />} />
    </Routes>
  </div>
);

export default App;
