import React from "react";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Tasks from "./components/Tasks";

function App() {
  return (
    <React.Fragment>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} exact />       
          <Route path="/about" element={<About />} exact />
          <Route path="/tasks" element={<Tasks />} exact />
        </Routes>
      </main>
    </React.Fragment>
  );
}

export default App;
