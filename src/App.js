import React from "react";
import Header from "./components/Header/Header";
import { Routes, Route, Navigate } from "react-router-dom";
import MainPage from "./components/MainPage/MainPage";
import ProductPage from "./components/ProductPage/ProductPage";
import Store from "./components/Store";
import CartPage from "./components/Cart/CartPage";

function App() {
  return (
    <Store>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/all" />} />
        <Route path=":category" element={<MainPage />} />
        <Route path=":category/:id" element={<ProductPage />} />
        <Route path=":category/cart" element={<CartPage />} />
      </Routes>
    </Store>
  );
}

export default App;
