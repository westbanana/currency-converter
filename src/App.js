import './App.css';
import React, {useEffect, useRef, useState} from "react";
import {Route, Routes, useSearchParams} from "react-router-dom";
import MainScreen from "./components/MainScreen";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MainScreen/>}/>
      </Routes>
    </div>
  );
}

export default App;
