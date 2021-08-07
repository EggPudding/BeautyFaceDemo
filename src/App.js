import './App.css';
import React, { Component, useState } from 'react';
import sample from './asset/sample.jpeg';

function App() {
  return (
    <div className="App">
      <img src={sample} aria-hidden alt="asset/sample.jpeg Image" />
      <header className="Text">
        <h1>BeautyFace Demo</h1>
        <h2>Guideline..</h2>
        {'<'} Load your image {'>'}
      </header>
    </div>
  );
}

export default App;
