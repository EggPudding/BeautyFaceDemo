import './App.css';
import React, { useEffect, useState } from 'react';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
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
      // setPreviewURL(null);
      // setResultURL(null);
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
        type: 'inference',
      };

      fetch(
        // 'https://us-central1-absolute-hook-325400.cloudfunctions.net/inference',
        'http://192.168.0.81:8080/',
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
          SetIsResultLoading(true);
        });
    }
  }, [previewURL]);

  return (
    <div
      style={{
        'text-align': 'center',
        'margin-top': '5vh',
        'margin-bottom': '15vh',
      }}
    >
      <header height="20vmin">
        <h1>BeautyFace Demo v.1</h1>
        <h2>Enhance photo with AI model</h2>
        <h3>
          Upload your own image and
          <br />
          Check the result!
        </h3>
      </header>
      <div style={{ 'margin-top': '5vh', 'margin-bottom': '10vh' }}>
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
        {/* Placeholder */}
        <img
          src={placeHolder}
          alt="profile"
          height="300vh"
          style={{ display: isPreviewLoading ? 'none' : 'inline' }}
        />

        {/* Preview Image */}
        <figure
          style={{
            display: isPreviewLoading ? 'inline-block' : 'none',
          }}
        >
          <img src={previewURL} alt="profile" height="300vh" />
          <figcaption
            style={{
              textAlign: 'center',
              fontSize: 'large',
            }}
          >
            Original Image
          </figcaption>
        </figure>

        {/* Result Image */}
        <figure
          style={{
            display: isResultLoading ? 'inline-block' : 'none',
          }}
        >
          <img src={resultURL} alt="result" height="300vh" />
          <figcaption
            style={{
              textAlign: 'center',
              fontSize: 'large',
            }}
          >
            Enhanced Image
          </figcaption>
        </figure>
      </div>
      <div>
        <h3>enhance lib color</h3>
        <Grid container spacing={1} direction="row">
          <Grid item xs={3} />
          <Grid item xs={6}>
            <Slider
              aria-label="lib_r"
              defaultValue={0}
              valueLabelDisplay="off"
              step={5}
              min={-30}
              max={30}
              color="error"
            />
          </Grid>
          <Grid item xs={3} />
          <Grid item xs={3} />
          <Grid item xs={6}>
            <Slider
              aria-label="lib_g"
              defaultValue={0}
              valueLabelDisplay="off"
              step={5}
              min={-30}
              max={30}
              color="success"
            />
          </Grid>
          <Grid item xs={3} />
          <Grid item xs={3} />
          <Grid item xs={6}>
            <Slider
              aria-label="lib_b"
              defaultValue={0}
              valueLabelDisplay="off"
              step={5}
              min={-30}
              max={30}
              color="primary"
            />
          </Grid>
          <Grid item xs={3} />
        </Grid>
        <h3>enhance eye color</h3>
        <Grid container spacing={1} direction="row">
          <Grid item xs={3} />
          <Grid item xs={6}>
            <Slider
              aria-label="eye_r"
              defaultValue={0}
              valueLabelDisplay="off"
              step={5}
              min={-30}
              max={30}
              color="error"
            />
          </Grid>
          <Grid item xs={3} />
          <Grid item xs={3} />
          <Grid item xs={6}>
            <Slider
              aria-label="eye_g"
              defaultValue={0}
              valueLabelDisplay="off"
              step={5}
              min={-30}
              max={30}
              color="success"
            />
          </Grid>
          <Grid item xs={3} />
          <Grid item xs={3} />
          <Grid item xs={6}>
            <Slider
              aria-label="eye_b"
              defaultValue={0}
              valueLabelDisplay="off"
              step={5}
              min={-30}
              max={30}
              color="primary"
            />
          </Grid>
          <Grid item xs={3} />
        </Grid>
      </div>
    </div>
  );
}

export default App;
