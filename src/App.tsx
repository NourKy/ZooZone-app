import React from "react";
import { Routes, Route } from "react-router-dom";

import Header from "./Components/Header/Header";

import AnimalManagement from "./Pages/AnimalManagement";

function App() {
  return (
    <div className="App bg-gray-200">
      <Header />
      <Routes>
        <Route path="/*" element={<AnimalManagement />} />
      </Routes>
    </div>
  );
}

export default App;
