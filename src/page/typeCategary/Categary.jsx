import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { data } from "../../config/data";
import { newsApi } from "../../config/newsApi";
import imageNotFound from "../../assete/download.jpg";
import { useNavigate } from "react-router-dom";
import image from "../../assete/download.jpg";
import { theme } from "../config";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
} from "@mui/material";
import Home from "../home/Home";
import axios from "axios";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Categary() {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
  const [newsList, _newsList] = React.useState([]);
  const [keylist, _keylist] = React.useState([]);
  const [englishList, _englishList] = React.useState([]);
  const [filterKey, _filterKey] = React.useState("");
  const [finallist, _finallist] = React.useState([]);
  const [linklist, _linklist] = React.useState([]);

  var currentDate = new Date();
  var day = currentDate.getDate();
  var month = currentDate.getMonth() + 1;
  var year = currentDate.getFullYear();

  const baseURL = `https://newsapi.org/v2/everything?q=Apple&from=${
    year + "-" + month + "-" + day
  }&sortBy=popularity&apiKey=20a19ad0a182418a947dd749316449b1`;

  const getUserData = async () => {
    const res = await axios
      .get("/getdata", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        var cells = ["ENGLISH", "ALL"];
        let totaldata = response.data;
        _newsList(totaldata);
        for (var i = 0; i < totaldata.length; i++) {
          cells.push(totaldata[i].keyword.toUpperCase());
        }
        const uniq = [...new Set(cells)];
        _keylist(uniq);
      });
  };

  const getVideoData = async () => {
    const res = await axios
      .get("/getvideolink", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        _linklist(response.data);
      });
  };

  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      _englishList(response.data);
    });
  }, []);

  React.useEffect(() => {
    getUserData();
    getVideoData();
  }, []);

  React.useEffect(() => {
    if (value === 1) {
      _finallist(newsList);
    } else {
      const out = newsList.filter((o) => o.keyword.toUpperCase() == filterKey);
      _finallist(out);
    }
  }, [value]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    const key = keylist.find((o, index) => index === newValue);
    var value = key.toUpperCase();
    _filterKey(value);
  };

  return (
    <>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderColor: "divider" }}>
          <Tabs
            sx={{
              ".MuiTabs-flexContainer": {
                borderBottom: "1px solid #dbd9da",
              },
              ".Mui-selected": {
                fontWeight: 400,
                background: "#dbd9da",
              },
              ".MuiTabs-scroller": {
                overflow: "scroll !important",
                "::-webkit-scrollbar": {
                  width: "0px",
                  background: "transparent",
                },
              },
            }}
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            {keylist.map((item, index) => (
              <Tab
                key={index}
                sx={{ borderBottom: "1px solid #dbd9da" }}
                label={item}
                {...a11yProps(index)}
              />
            ))}
          </Tabs>
        </Box>
        {value === 0 ? (
          <TabPanel value={value} index={value}>
            <Box sx={{ width: "100%", display: "flex" }}>
              <Box
                sx={{
                  width: "80%",
                  p: 3,
                  [theme.breakpoints.down("lg")]: {
                    width: "100%",
                    p: 0,
                  },
                }}
              >
                {englishList?.articles?.map((item, index) => (
                  <Grid
                    onClick={() => navigate("/details", { state: item })}
                    sx={{ mb: 2, boxShadow: 3, p: 2, borderRadius: "10px" }}
                    item
                    xs={2}
                    sm={4}
                    md={4}
                    key={index}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        gap: "10px",
                        [theme.breakpoints.down("md")]: {
                          display: "flex",
                          flexDirection: "column",
                        },
                      }}
                    >
                      <Box
                        component="img"
                        sx={{
                          [theme.breakpoints.up("md")]: {
                            maxWidth: 350,
                          },
                          [theme.breakpoints.down("md")]: {
                            width: "100%",
                          },
                          boxShadow: 3,
                          aspectRatio: "16/9",
                          borderRadius: "10px",
                          objectFit: "cover",
                        }}
                        src={item.urlToImage ? item.urlToImage : imageNotFound}
                      />
                      <Box
                        sx={{
                          // border: "1px solid black",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box>
                          <Typography
                            sx={{
                              textTransform: "uppercase",
                              fontWeight: 600,
                              fontFamily: "sans-serif",
                              mb: "10px",
                            }}
                          >
                            {item.title.substring(0, 45)}...
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "15px",
                              color: "#b5b2b1",
                            }}
                          >
                            {item.description}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            ".authorFont": {
                              fontSize: "12px",
                              fontWeight: 900,
                              color: "gray",
                              fontFamily: "monospace",
                            },
                          }}
                        >
                          <Typography className="authorFont">
                            {item.source.name}
                          </Typography>
                          <Typography className="authorFont">
                            {item.author}
                          </Typography>
                          <Typography className="authorFont">
                            {item.publishedAt}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Box>
              <Box
                sx={{
                  width: "20%",
                  p: 3,
                  [theme.breakpoints.down("lg")]: {
                    display: "none",
                  },
                }}
              >
                {linklist.map((item, index) => (
                    <Card
                      sx={{ maxWidth: 345, boxShadow: 3, p: 1, mb: "10px" }}
                    >
                      <iframe
                        style={{ borderRadius: 6 }}
                        width="100%"
                        height="200"
                        src={`${item.linkVideo}`}
                      ></iframe>
                      <CardContent>
                        <Typography gutterBottom variant="h6" component="div">
                          {item.titleVideo}
                        </Typography>
                      </CardContent>
                    </Card>
                  ))}
              </Box>
            </Box>
          </TabPanel>
        ) : (
          <TabPanel value={value} index={value}>
            <Box sx={{ width: "100%", display: "flex" }}>
              <Box
                sx={{
                  width: "80%",
                  p: 3,
                  [theme.breakpoints.down("lg")]: {
                    width: "100%",
                    p: 0,
                  },
                }}
              >
                {finallist?.map((item, index) => (
                  <Grid
                    key={index}
                    onClick={() => navigate("/details", { state: item })}
                    sx={{ mb: 2, boxShadow: 3, p: 2, borderRadius: "10px" }}
                    item
                    xs={2}
                    sm={4}
                    md={4}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        gap: "10px",
                        [theme.breakpoints.down("md")]: {
                          display: "flex",
                          flexDirection: "column",
                        },
                      }}
                    >
                      <Box
                        component="img"
                        sx={{
                          [theme.breakpoints.up("md")]: {
                            maxWidth: 350,
                          },
                          [theme.breakpoints.down("md")]: {
                            width: "100%",
                          },
                          boxShadow: 3,
                          aspectRatio: "16/9",
                          borderRadius: "10px",
                          objectFit: "cover",
                        }}
                        src={
                          item.image_url
                            ? `/uploads/${item.image_url}`
                            : imageNotFound
                        }
                      />
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box>
                          <Typography
                            sx={{
                              textTransform: "uppercase",
                              fontWeight: 600,
                              fontFamily: "sans-serif",
                              mb: "10px",
                            }}
                          >
                            {item.title.substring(0, 45)}...
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: "15px",
                              color: "#b5b2b1",
                            }}
                          >
                            {item.discription.substring(0, 700)}....
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            ".authorFont": {
                              fontSize: "12px",
                              fontWeight: 900,
                              color: "gray",
                              fontFamily: "monospace",
                            },
                          }}
                        >
                          <Typography className="authorFont">
                            {item.author}
                          </Typography>
                          <Typography className="authorFont">
                            {item.keyword}
                          </Typography>
                          <Typography className="authorFont">
                            {item.publishAt}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Box>
              <Box
                sx={{
                  width: "20%",
                  p: 3,
                  [theme.breakpoints.down("lg")]: {
                    display: "none",
                  },
                }}
              >
                {linklist.map((item, index) => (
                    <Card
                      sx={{ maxWidth: 345, boxShadow: 3, p: 1, mb: "10px" }}
                    >
                      <iframe
                        style={{ borderRadius: 6 }}
                        width="100%"
                        height="200"
                        src={`${item.linkVideo}`}
                      ></iframe>
                      <CardContent>
                        <Typography gutterBottom variant="h6" component="div">
                          {item.titleVideo}
                        </Typography>
                      </CardContent>
                    </Card>
                  ))}
              </Box>
            </Box>
          </TabPanel>
        )}
      </Box>
    </>
  );
}
