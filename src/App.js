import React from "react";
import { ThemeProvider } from "styled-components";
import { darkTheme } from "./utils/Themes";
import Navbar from "./components/Navbar";
import { BrowserRouter } from "react-router-dom";
import Hero from "./components/sections/Hero";
import Skills from "./components/sections/Skills"
import Experience from "./components/sections/Experience";



function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <BrowserRouter>
        <Navbar/>
        <Hero/>
        <Skills/>
        <Experience/>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;