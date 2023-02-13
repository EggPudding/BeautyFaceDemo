import './App.css';
import React, { useEffect, useState } from 'react';
import Slider from '@mui/material/Slider';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { getRadioUtilityClass } from '@mui/material';
import placeHolder from './asset/pngegg.png';

function App() {
  const [image, setImage] = useState();
  const [previewURL, setPreviewURL] = useState('');
  const [resultURL, setResultURL] = useState('');
  const [segmentURL, setSegmentURL] = useState('');
  const [isPreviewLoading, setIsPreviewLoading] = useState(false);
  const [isResultLoading, setIsResultLoading] = useState(false);

  const [libColor, setLibColor] = useState([0, 0, 0]);

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
        'https://us-central1-absolute-hook-325400.cloudfunctions.net/inference',
        // 'http://192.168.0.81:8080/',
        // 'http://192.168.1.50:8080/',
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
          setSegmentURL(`data:image/png;base64,${res.segment}`);
          setIsResultLoading(true);
        });
    }
  }, [previewURL]);

  // Lib color change callback
  useEffect(() => {
    if (isResultLoading) {
      console.log(libColor);

      const post = {
        data: previewURL
          .toString()
          .replace(/^data:image\/(png|jpg|jpeg);base64,/, ''),
        type: 'enhance_lib',
        segment: segmentURL
          .toString()
          .replace(/^data:image\/(png|jpg|jpeg);base64,/, ''),
        value: libColor,
      };

      console.log(post);

      fetch(
        'https://us-central1-absolute-hook-325400.cloudfunctions.net/inference',
        // 'http://192.168.0.81:8080/',
        // 'http://192.168.1.50:8080/',
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
          setIsResultLoading(true);
        });
    }
  }, [libColor]);

  return (
    <div
      style={{
        'text-align': 'center',
        'margin-top': '5vh',
        'margin-bottom': '15vh',
      }}
    >
      {/* 1. Header */}
      <header height="20vmin">
        <h1>BeautyFace Demo v.1.0.0</h1>
        <h2>Enhance photo with AI model</h2>
        <h3>
          Upload your own image and
          <br />
          Check the result!
        </h3>
      </header>

      {/* 2. Upload Button */}
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

      {/* 3. Image */}
      <div>
        {/* 3.1. Placeholder */}
        <img
          src={placeHolder}
          alt="profile"
          height="300vh"
          style={{ display: isPreviewLoading ? 'none' : 'inline' }}
        />

        {/* 3.2. Preview Image */}
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

        {/* 3.3. Result Image */}
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

      {/* 4. Slider */}
      <div>
        {/* 4.1 Lib Color Slider */}
        <h3 style={{ display: isResultLoading ? 'inline-block' : 'none' }}>
          enhance lib color
        </h3>
        <Grid
          container
          spacing={1}
          direction="row"
          style={{ display: isResultLoading ? 'flex' : 'none' }}
        >
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
              onChangeCommitted={(e, v) => {
                // e.preventDefault();
                setLibColor([v, libColor[1], libColor[2]]);
              }}
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
              onChangeCommitted={(e, v) => {
                // e.preventDefault();
                setLibColor([libColor[0], v, libColor[2]]);
              }}
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
              onChangeCommitted={(e, v) => {
                // e.preventDefault();
                setLibColor([libColor[0], libColor[1], v]);
              }}
            />
          </Grid>
          <Grid item xs={3} />
        </Grid>
        {/* 4.1 Lib Color Slider */}
        {/* <h3>enhance eye color</h3>
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
        </Grid> */}
      </div>
    </div>
  );
}

export default App;
