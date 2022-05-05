import React, { createContext, useEffect } from "react";
import Header from "./components/Header/Header";
import { Routes, Route, Navigate } from "react-router-dom";
import MainPage from "./components/MainPage/MainPage";
import ProductPage from "./components/ProductPage/ProductPage";
import { gql, useQuery } from "@apollo/client";
import Store from "./components/Store";
import CartPage from "./components/Cart/CartPage";

const GETCURR = gql`
  query getCurrency {
    currencies {
      label
      symbol
    }
  }
`;

const initialState = {
  currency: null,
  cart: [],
};

function App() {
  const { loading, error, data } = useQuery(GETCURR);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error...</p>;
  initialState.currency = data.currencies.find(
    ({ label }) => label === window.localStorage.getItem("curr")
  )
    ? data.currencies.find(
        ({ label }) => label === window.localStorage.getItem("curr")
      )
    : data.currencies[0];
  window.localStorage
    .getItem("cart")
    .split(", ")
    .map(
      (str) => (initialState.cart = initialState.cart.concat(JSON.parse(str)))
    );

  console.log(initialState);
  return (
    <Store initialState={initialState}>
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
