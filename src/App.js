import React, { createContext, useEffect } from "react";
import Header from "./components/Header/Header";
import { Routes, Route, Navigate } from "react-router-dom";
import MainPage from "./components/MainPage/MainPage";
import ProductPage from "./components/ProductPage/ProductPage";
import { gql, useQuery } from "@apollo/client";
import Store from "./components/Store";

const GETCURR = gql`
  query getCurrency {
    currencies {
      label
      symbol
    }
  }
`;

function App() {
  const { loading, error, data } = useQuery(GETCURR);
  if (loading) return <p>Loading...</p>;
  return (
    <Store initialState={data.currencies[0]}>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/all" />} />
        <Route path=":category" element={<MainPage />} />
        <Route path=":category/:id" element={<ProductPage />} />
      </Routes>
    </Store>
  );
}

export default App;
