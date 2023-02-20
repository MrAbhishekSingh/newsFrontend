import React from "react";
import Home from "./page/home/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Details from "./page/details/Details";
import { Box } from "@mui/system";
import Categary from "./page/typeCategary/Categary";
import Admin from "./page/Admin/Admin";
import Upload from "./page/Admin/Upload";

const App = () => {
  return (
    <Box>
      <Box sx={{height: "100px",}} >
        <Home />
      </Box>
      <Router>
        <Routes>
          <Route path="/" element={<Categary />} />
          <Route path="/Details" element={<Details />} />
          <Route path="/Admin" element={<Admin />} />
          <Route path="/Upload" element={<Upload />} />
        </Routes>
      </Router>
    </Box>
  );
};

export default App;

//news api key 20a19ad0a182418a947dd749316449b1

//
