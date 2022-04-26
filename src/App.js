import React from "react";
import Header from "./components/Header/Header";
import { Routes, Route } from "react-router-dom";
import MainPage from "./components/MainPage/MainPage";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/">
          <Route path=":category" element={<MainPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
