import './App.css';
import React, { useEffect, useState } from 'react';
import sample from './asset/sample.jpeg';

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
    } else {
      setPreviewURL(null);
      setResultURL(null);
    }
  }, [image]);

  useEffect(() => {
    if (previewURL) {
      console.log(previewURL);

      const post = {
        data: previewURL
          .toString()
          .replace(/^data:image\/(png|jpg|jpeg);base64,/, ''),
      };

      fetch(
        'https://us-central1-absolute-hook-325400.cloudfunctions.net/inference',
        {
          method: 'POST',
          headers: {
            'content-type': 'application/json',
          },
          body: JSON.stringify(post),
        },
      )
        .then((res) => res.json())
        .then((res) => {
          setResultURL(`data:image/png;base64,${res.data}`);
        });
    }
  }, [previewURL]);

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
        <img src={previewURL} alt="profile" height="300" />
        <img src={resultURL} alt="result" height="300" />
      </div>
    </div>
  );
}

export default App;
