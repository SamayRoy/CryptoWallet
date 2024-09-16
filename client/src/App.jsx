import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import WatchList from "./pages/WatchList";
import TokenTransfer from "./pages/TokenTransfer";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/watchlist" element={<WatchList />} />
          <Route path="/transfer" element={<TokenTransfer />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
