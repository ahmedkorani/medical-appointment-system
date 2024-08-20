import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "./index.css";
import { Login, Home } from "./routes";
import { Box, CircularProgress } from "@mui/material";
import ResponsiveAppBar from "./components/Appbar";
import { AppProvider } from "./store/AppProvider";

const App = () => {
  return (
    <AppProvider>
      <Box
        sx={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <ResponsiveAppBar />
        <Router>
          <React.Suspense
            fallback={
              <Box
                sx={{
                  height: "100%",
                  width: "100%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <CircularProgress />
              </Box>
            }
          >
            <Routes>
              <Route path="/" element={<Navigate to="/home" />} />
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </React.Suspense>
        </Router>
      </Box>
    </AppProvider>
  );
};

export default App;
