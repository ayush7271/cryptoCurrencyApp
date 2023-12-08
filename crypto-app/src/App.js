// src/App.js
import React, { useEffect, useState } from "react";
import { HomePage } from "./components/HomePage";
import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { CoinGraph } from "./components/CoinGraph";
const App = () => {
  const [currency, setCurrency] = useState("inr");
  console.log(currency, "currency");
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar setCurrency={setCurrency} currency={currency} />
              <HomePage currency={currency} />
            </>
          }
        ></Route>
        <Route
          path="/:id"
          element={
            <>
              <CoinGraph currency={currency} />
            </>
          }
        ></Route>
      </Routes>
    </>
  );
};

export default App;
