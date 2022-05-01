import React from "react";
import Header from "./components/Header/Header";
import { Routes, Route, Navigate } from "react-router-dom";
import MainPage from "./components/MainPage/MainPage";
import ProductPage from "./components/ProductPage/ProductPage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/all" />} />
        <Route path=":category" element={<MainPage />} />
        <Route path=":category/:id" element={<ProductPage />} />
      </Routes>
    </>
  );
}

export default App;
