import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { useLocation } from "react-router-dom";
import imageNotFound from "../../assete/download.jpg";

const Details = () => {
  const location = useLocation();
  return (
    <>
      {location.state.urlToImage ? (
        <Box sx={{ display: "flex", mt: 3 }}>
          <Box sx={{ width: "80%", px: 3 }}>
            <Typography
              sx={{
                fontSize: "45px",
                fontWeight: 900,
                fontFamily: "sans-serif",
              }}
            >
              {location.state.title}
            </Typography>
            <Box
              component="img"
              sx={{
                width: "100%",
                boxShadow: 3,
                aspectRatio: "16/9",
                borderRadius: "10px",
                objectFit: "cover",
              }}
              src={
                location.state.urlToImage
                  ? location.state.urlToImage
                  : imageNotFound
              }
            />
            <Typography
              sx={{
                fontSize: "25px",
                fontWeight: 700,
                fontFamily: "sans-serif",
                color: "gray",
                mt: 3,
              }}
            >
              {location.state.description}
            </Typography>
          </Box>
          <Box sx={{ width: "20%", p: 3, border: "1px solid black" }}></Box>
        </Box>
      ) : (
        <Box sx={{ display: "flex", mt: 3 }}>
          <Box sx={{ width: "80%", px: 3 }}>
            <Typography
              sx={{
                fontSize: "45px",
                fontWeight: 900,
                fontFamily: "sans-serif",
              }}
            >
              {location.state.title}
            </Typography>
            <Box
              component="img"
              sx={{
                width: "100%",
                boxShadow: 3,
                aspectRatio: "16/9",
                borderRadius: "10px",
                objectFit: "cover",
              }}
              src={
                location.state.image_url
                  ? `/uploads/${location.state.image_url}`
                  : imageNotFound
              }
            />
            <Typography
              sx={{
                fontSize: "25px",
                fontWeight: 700,
                fontFamily: "sans-serif",
                color: "gray",
                mt: 3,
              }}
            >
              {location.state.discription}
            </Typography>
          </Box>
          <Box sx={{ width: "20%", p: 3, border: "1px solid black" }}></Box>
        </Box>
      )}
    </>
  );
};

export default Details;
