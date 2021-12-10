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
    <div style={{ 'text-align': 'center' }}>
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

        {/* <Box
          // alignItems="center"
          // justifyContent="center"
          component="div"
          sx={{
            mt: '10vh',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px dashed grey',
            width: '50%',
          }}
        >
          <Slider
            // alignItems="center"
            // justifyContent="center"
            aria-label="eye"
            defaultValue={0}
            valueLabelDisplay="off"
            step={5}
            min={-30}
            max={30}
            color="secondary"
          />
        </Box> */}
      </div>
      <div>
        {/* <Stack spacing={1} direction="column" alignItems="center">
          <h3>Result</h3>
          <Slider
            aria-label="lib"
            defaultValue={0}
            valueLabelDisplay="off"
            step={5}
            min={-30}
            max={30}
            color="primary"
          />
          <h3>Result</h3>
          <Slider
            aria-label="eye"
            defaultValue={0}
            valueLabelDisplay="off"
            step={5}
            min={-30}
            max={30}
            color="secondary"
          />
        </Stack> */}
        {/* <Box component="span" sx={{ p: 2, border: '1px dashed grey' }}>
          <Slider
            aria-label="eye"
            defaultValue={0}
            valueLabelDisplay="off"
            step={5}
            min={-30}
            max={30}
            color="secondary"
          />
        </Box> */}
      </div>
    </div>
  );
}

export default App;
