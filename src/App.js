import './App.css';
import React, { Component, useEffect, useState } from 'react';
import sample from './asset/sample.jpeg';

function getBase64Image(img) {
  const canvas = document.createElement('canvas');
  canvas.width = img.width;
  canvas.height = img.height;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(img, 0, 0);
  const dataURL = canvas.toDataURL('image/png');
  return dataURL.replace(/^data:image\/(png|jpg);base64,/, '');
}

function App() {
  const [image, setImage] = useState();
  const [previewURL, setPreviewURL] = useState('');
  const [resultURL, setResultURL] = useState('');

  useEffect(() => {
    const reader = new FileReader();
    if (image) {
      reader.onloadend = () => {
        setPreviewURL(reader.result);
      };
      reader.readAsDataURL(image);

      // const post = {
      //   cat: `${previewURL}`.toString().slice(23),
      // };

      const post = {
        cat: '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',
      };

      // TODO: fix asynchronous behavior
      // console.log(previewURL);
      // console.log(`${previewURL}`.toString().slice(23));
      // console.log(post);
      // console.log(JSON.stringify(post));

      fetch(
        'https://us-central1-absolute-hook-325400.cloudfunctions.net/inference',
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          // mode: 'no-cors', // TODO: no-cors option seems not to be good
          body: JSON.stringify(post),
        },
      )
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          // console.log(data.cat);
          // console.log(`data:image/png;base64,${data.cat}`);
          setResultURL(`data:image/png;base64,${data.cat}`);
        });
    } else {
      setPreviewURL(null);
      setResultURL(null);
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
            } else {
              setImage(null);
            }
          }}
        />
      </div>
      <header className="Text">
        <p>{previewURL}</p>
      </header>
      <div>
        <img src={previewURL} alt="profile" />
        <img src={resultURL} alt="result" />
      </div>
    </div>
  );
}

export default App;
