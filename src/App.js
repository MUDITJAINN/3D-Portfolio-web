import styled, { ThemeProvider } from "styled-components";
import { darkTheme } from "./utils/Themes";
import Navbar from "./components/Navbar";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <ThemeProvider Theme ={darkTheme}>
      <BrowserRouter>
        <Navbar/>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;