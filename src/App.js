import React from "react";
import { ThemeProvider } from "styled-components";
import { darkTheme } from "./utils/Themes";
import Navbar from "./components/Navbar";
import { BrowserRouter } from "react-router-dom";
import Hero from "./components/sections/Hero";



function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <BrowserRouter>
        <Navbar/>
        <Hero/>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;