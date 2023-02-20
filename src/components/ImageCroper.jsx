import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import ReactCrop, {
  centerCrop,
  Crop,
  makeAspectCrop,
  PixelCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { canvasPreview } from "./canvasPreview";
import { useDebounceEffect } from "./useDebounceEffect";

//
function centerAspectCrop(mediaWidth, mediaHeight, aspect) {
  return centerCrop(
    makeAspectCrop(
      {
        unit: "%",
        width: 90,
      },
      aspect,
      mediaWidth,
      mediaHeight
    ),
    mediaWidth,
    mediaHeight
  );
}

function CropDemo(props) {
  const {
    src,
    cropModal,
    SetCropModal,
    changeBgImage,
    index,
    changeArray,
    ration,
    removeSource,
    finImg
  } = props;
  const aspect = ration;

  const [crop, setCrop] = useState();
  const [imageValue, _imageValue] = useState("");
  const [draged, _draged] = useState(false);
  const [completedCrop, setCompletedCrop] = useState();
  const previewCanvasRef = useRef(null);
  const imgRef = useRef(null);
  const handleModalClose = () => {
    finImg(
      previewCanvasRef.current.toDataURL("image/jpeg").split(";base64,")[1]
    );

    SetCropModal(false);
  };
  function onImageLoad(e) {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  }

  useDebounceEffect(
    async () => {
      if (
        completedCrop?.width &&
        completedCrop?.height &&
        imgRef.current &&
        previewCanvasRef.current
      ) {
        // We use canvasPreview as it's much faster than imgPreview.
        canvasPreview(imgRef.current, previewCanvasRef.current, completedCrop);
      }
    },
    100,
    [completedCrop]
  );
  return (
    <Dialog
      open={cropModal}
      onClose={() => SetCropModal(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth="md"
      fullWidth={true}
    >
      <span
        className="d-flex"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <DialogTitle id="alert-dialog-title">
          {"Crop Image to fit."}
        </DialogTitle>
      </span>
      <DialogContent className="crop-dialog">
        <div
          style={{
            position: "relative",
            zIndex: 1000,
            height: "auto",
            maxHeight: "calc(100vh - 100px)",
            background: "#eee",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <ReactCrop
            keepSelection={false}
            crop={crop}
            onChange={(c) => {
              setCrop(c);
            }}
            onComplete={(c) => {
              setCompletedCrop(c);
            }}
            onDragEnd={() => {
              // _draged(true)
            }}
            aspect={aspect}
          >
            <img src={src} ref={imgRef} onLoad={onImageLoad} />
          </ReactCrop>
        </div>
      </DialogContent>
      <DialogContent
        sx={{
          display: "none",
        }}
      >
        <div
          style={{
            position: "relative",
            zIndex: 1000,
            height: 350,
            background: "#eee",
          }}
        >
          <div>
            <canvas
              ref={previewCanvasRef}
              style={{
                border: "1px solid black",
                objectFit: "contain",
                width: "100px",
                height: "100px",
              }}
            />
            {/* {!!completedCrop && (
                )} */}
          </div>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => SetCropModal(false)} color="primary">
          Cancel
        </Button>
        <Button
          color="primary"
          onClick={() => {
            handleModalClose();
          }}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CropDemo;
