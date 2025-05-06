import { useState } from "react";
import Header from "./components/Header.tsx";
import { Route, Routes, Link } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/create" element={<h1>Create</h1>} />
        <Route path="/contact" element={<h1>Contact</h1>} />
        <Route path="/documentation" element={<h1>Docs</h1>} />
      </Routes>
    </>
  );
}

export default App;
