import * as React from "react";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { Button, Modal, TextField, Typography } from "@mui/material";
import { useState } from "react";
import axios from "axios";
import ReactCrop from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import CropDemo from "../../components/ImageCroper";
// import image from '../../../../uploads'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Upload() {
  const [title, _title] = useState("");
  const [discription, _discription] = useState("");
  const [author, _author] = useState("");
  const [keyword, _keyword] = useState("");
  const [src, setSrc] = useState("");
  const [crop, setCrop] = useState({ aspect: 16 / 9 });
  const [image, setImage] = useState(null);
  const [output, setOutput] = useState(null);
  const [imagePath, _imagePath] = useState("");
  const [cropModal, _cropModal] = useState(false);
  const [titleVideo, _titleVideo] = useState("");
  const [linkVideo, _linkVideo] = useState("");

  const setCropFunction = (src) => {
    _imagePath(URL.createObjectURL(src.target.files[0]));
    _cropModal(true);
  };

  React.useEffect(() => {
    if (image) {
      fetch("data:image/jpeg;base64," + image)
        .then((res) => res.blob())
        .then((blob) => {
          console.log("blob", blob);
          const file = new File([blob], "image", { type: blob.type });
          setSrc(file);
        });
    }
  }, [image]);

  const addinpdata = async () => {
    var formData = new FormData();
    formData.append("photo", src);
    formData.append(
      "fname",
      JSON.stringify({
        title: title,
        discription: discription,
        author: author,
        publishAt: new Date(),
        keyword: keyword,
      })
    );

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const res = await axios.post("/create", formData, config);
    console.log('res',res);
    if (res.status == 201) {
      _title("");
      _author("");
      setSrc("");
      _imagePath("");
      _discription("");
      _keyword('');
      setImage(null)
      console.log("done upload");
    } else {
      console.log("error");
    }
  };

  const addLink = async () => {
    const res = await fetch("/videolink", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        titleVideo,
        linkVideo,
      }),
    });

    const data = await res.json();
    console.log(data);

    if (res.status === 422 || !data) {
      console.log("error ");
      alert("error");
    } else {
      _linkVideo("");
      _titleVideo("");
      console.log("data added");
    }
  };


  return (
    <Box sx={{ my: 3, px: 2 }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={12} md={6}>
          <TextField
            onChange={(e) => _title(e.target.value)}
            value={title}
            fullWidth
            id="outlined-basic"
            label="Title"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            onChange={(e) => _author(e.target.value)}
            value={author}
            fullWidth
            id="outlined-basic"
            label="Author"
            variant="outlined"
          />
        </Grid>
        <Grid
          sx={{ display: "flex", justifyContent: "space-between" }}
          item
          xs={12}
          md={6}
        >
          <TextField
            fullWidth
            //  ref={fileInput}
            type="file"
            id="outlined-basic"
            variant="outlined"
            accept="image/*"
            onChange={(e) => setCropFunction(e)}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            onChange={(e) => _keyword(e.target.value)}
            value={keyword}
            fullWidth
            id="outlined-basic"
            label="Keyword"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            onChange={(e) => _discription(e.target.value)}
            value={discription}
            fullWidth
            id="outlined-multiline-static"
            label="Discription"
            multiline
            rows={4}
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            onClick={addinpdata}
            fullWidth
            variant="contained"
            color="success"
          >
            Upload
          </Button>
        </Grid>
        <Grid sx={{ display: "flex", justifyContent: "center" }} item xs={12}>
          <Typography
            sx={{
              textTransform: "uppercase",
              fontSize: "25px",
              fontWeight: 600,
              mt: 5,
            }}
          >
            Youtube Video Link
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField
            onChange={(e) => _titleVideo(e.target.value)}
            value={titleVideo}
            fullWidth
            id="outlined-basic"
            label="Youtube Title"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            onChange={(e) => _linkVideo(e.target.value)}
            value={linkVideo}
            fullWidth
            type="url"
            id="outlined-basic"
            label="Youtube Link"
            variant="outlined"
          />
        </Grid>
        <Grid item xs={12}>
          <Button onClick={addLink} fullWidth variant="contained" color="info">
            Upload
          </Button>
        </Grid>
      </Grid>
      <div>
        {imagePath && (
          <CropDemo
            src={imagePath}
            cropModal={cropModal}
            finImg={setImage}
            SetCropModal={_cropModal}
            ration={16 / 9}
          />
        )}
      </div>
    </Box>
  );
}

// import { useEffect, useState } from 'react';
// import ReactCrop from 'react-image-crop';
// import 'react-image-crop/dist/ReactCrop.css';
// import CropDemo from '../../components/ImageCroper';

// function App(props) {
// const [src, setSrc] = useState(null);
// const [crop, setCrop] = useState({ aspect: 16 / 9 });
// const [image, setImage] = useState(null);
//   const [output, setOutput] = useState(null);
//   const [imagePath,_imagePath] = useState('')
//   const [cropModal,_cropModal] = useState(false);

// const setCropFunction = (src) => {
//     _imagePath(URL.createObjectURL(src.target.files[0]))
//     _cropModal(true)
//   }

//   useEffect(() => {
//     fetch("data:image/jpeg;base64," + image)
//     .then(res => res.blob())
//     .then(blob => {
//       console.log(blob);
//       var url = window.URL.createObjectURL(blob);
//         console.log('image', url);
//     });

//   }, [image])

// return (
// 	<div className="App">
// 	<center>
// 		<input
// 		type="file"
// 		accept="image/*"
// 	onChange={(e) => setCropFunction(e)}
// 		/>
// 		<br />
// 		<br />
// 		<div>
//         {imagePath && (
// 		      <CropDemo src={imagePath} cropModal={cropModal} finImg={setImage}  SetCropModal={_cropModal} ration={16/9} />
// 		)}
// 		</div>
// 		<div>{output && <img src={output} />}</div>
// 	</center>
// 	</div>
// );
// }

// export default App;
