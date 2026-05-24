/**
 * App.js — Root layout
 * -------------------------
 * Portfolio sections stay here; assistant/tour mount as siblings so
 * they do not couple to Hero or Projects internals.
 */
import React, { useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import { darkTheme } from "./utils/Themes";
import Navbar from "./components/Navbar";
import { BrowserRouter } from "react-router-dom";
import Hero from "./components/sections/Hero";
import Skills from "./components/sections/Skills";
import Experience from "./components/sections/Experience";
import Education from "./components/sections/Education";
import StartCanvas from "./components/canvas/Stars";
import Projects from "./components/sections/Projects";
import Contact from "./components/sections/Contact";
import Footer from "./components/sections/Footer";
import { Helmet } from "react-helmet";
import AssistantUI from "./components/AssistantUI";
import RobotController from "./robot/RobotController";
import usePerformance from "./hooks/usePerformance";
import env from "./config/environment";

const Body = styled.div`
  background-color: ${({ theme }) => theme.bg};
  width: 100%;
  overflow-x: hidden;
  position: relative;
`;

const Wrapper = styled.div`
  padding-bottom: 100px;
  background: linear-gradient(
      38.73deg,
      rgba(204, 0, 187, 0.15) 0%,
      rgba(201, 32, 184, 0) 50%
    ),
    linear-gradient(
      141.27deg,
      rgba(0, 70, 209, 0) 50%,
      rgba(0, 70, 209, 0.15) 100%
    );
  width: 100%;
  clip-path: polygon(0 0, 100% 0, 100% 100%, 30% 98%, 0 100%);
`;

function App() {
  // Pause Three.js animations when user switches tabs (saves GPU/battery)
  usePerformance();

  // Google Analytics 4 (gtag) — loads script via Helmet below
  useEffect(() => {
    window.dataLayer = window.dataLayer || [];
    window.gtag =
      window.gtag ||
      function gtag() {
        window.dataLayer.push(arguments);
      };
    window.gtag("js", new Date());
    window.gtag("config", env.gaMeasurementId);
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <BrowserRouter>
        <Helmet>
          <script
            async
            src={`https://www.googletagmanager.com/gtag/js?id=${env.gaMeasurementId}`}
          ></script>
        </Helmet>
        <Navbar />
        <Body>
          <StartCanvas />
          <div>
            <Hero />
            <Wrapper>
              <Skills />
              <Experience />
            </Wrapper>
            <Projects />
            <Wrapper>
              <Education />
              <Contact />
            </Wrapper>
            <Footer />
          </div>
          <AssistantUI />
          <RobotController />
        </Body>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;