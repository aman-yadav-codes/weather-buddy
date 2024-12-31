import React from "react";
import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Usage from "./components/Usage";
import Github from "./components/Github";
import WeatherBuddy from "./components/WeatherBuddy";
import ScrollToTopButton from "./components/ScrollToTopButton";
import Snowfall from "./components/Snowfall";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/About" element={<About />} />
        <Route path="/Usage" element={<Usage />} />
        <Route path="/Github" element={<Github />} />
        <Route path="/WeatherBuddy" element={<WeatherBuddy />} />
      </Routes>
      <ScrollToTopButton />
      <Snowfall />
    </BrowserRouter>
  );
};

export default App;
