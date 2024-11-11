import React, { Component } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./App.css";
import Admin from "./Student/Admin";
import Direct from "./Student/Direct";
import DirectLogin from "./Student/DirectLogin";
import Final from "./Student/Final";
import Validate from "./Student/Validate";
function App() {
  return (
    <div>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Direct />} />
          <Route path="/login" element={<DirectLogin />} />
          <Route path="/finalpage" element={<Final />} />
          <Route path="/validate" element={<Validate />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
