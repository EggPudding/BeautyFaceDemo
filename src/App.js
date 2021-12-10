import './App.css';
import React, { useEffect, useState } from 'react';
import placeHolder from './asset/pngegg.png';

function App() {
  const [image, setImage] = useState();
  const [previewURL, setPreviewURL] = useState('');
  const [resultURL, setResultURL] = useState('');
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);
  const [isResultLoading, SetIsResultLoading] = useState(false);

  // Image change handler
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

  // previewURL change handler
  useEffect(() => {
    if (previewURL) {
      console.log(previewURL);

      setIsPreviewLoading(true);

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
          setIsLoading(true);
        });
    }
  }, [previewURL]);

  return (
    <div className="App" style={{ 'margin-top': 20 }}>
      <header className="App-logo">
        <h1>BeautyFace Demo</h1>
        <h2>Enhance photo with AI model</h2>
        <h3>
          Upload your own image and
          <br />
          Check the result!
        </h3>
      </header>
      <div style={{ 'margin-top': 60, 'margin-bottom': 40 }}>
        <label className="input-file-button" htmlFor="input-file">
          Upload
          <input
            id="input-file"
            style={{ display: 'none' }}
            type="file"
            accept="image/jpg,impge/png,image/jpeg"
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
        </label>
      </div>
      <div>
        <img
          src={placeHolder} // Placeholder before loading image
          aria-hidden
          alt="profile"
          height="300"
          style={{ display: isPreviewLoading ? 'none' : 'inline' }}
        />
        <figure
          style={{
            display: isPreviewLoading ? 'inline-block' : 'none',
            float: 'left',
            marginLeft: 150,
          }}
        >
          <img src={previewURL} aria-hidden alt="profile" height="300" />
          <figcaption>Original Image</figcaption>
        </figure>
        <figure
          style={{
            display: isResultLoading ? 'inline-block' : 'none',
            float: 'right',
            marginRight: 150,
          }}
        >
          <img src={resultURL} alt="result" height="300" />
          <figcaption>Enhanced Image</figcaption>
        </figure>
      </div>
    </div>
  );
}

export default App;
