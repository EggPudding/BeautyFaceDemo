import './App.css';
import React, { Component, useEffect, useState } from 'react';
import sample from './asset/sample.jpeg';

function App() {
  const [image, setImage] = useState();
  const [previewURL, setPreviewURL] = useState('');

  useEffect(() => {
    const reader = new FileReader();
    if (image) {
      reader.onloadend = () => {
        setPreviewURL(reader.result);
        console.log(reader.result);
      };
      reader.readAsDataURL(image);
      console.log('preview loaded');
      console.log(image);
    } else {
      setPreviewURL(null);
      console.log('preview not loaded');
    }
  }, [image]);

  return (
    <div className="App">
      <img src={sample} aria-hidden alt="asset/sample.jpeg Image" />
      <header className="Text">
        <h1>BeautyFace Demo</h1>
        <h2>Guideline..</h2>
        {'<'} Load your image {'>'}
      </header>
      <div>
        <input
          type="file"
          accept="image/jpg,impge/png,image/jpeg,image/gif"
          name="profile_img"
          onChange={(e) => {
            // e.preventDefault();
            const file = e.target.files[0];
            if (file) {
              setImage(file);
              console.log('file loaded');
            } else {
              setImage(null);
              console.log('file not loaded');
            }
          }}
        />
      </div>
      <header className="Text">
        <p>{previewURL}</p>
      </header>
      <div>
        <img src={previewURL} alt="profile_img" />
      </div>
    </div>
  );
}

export default App;
