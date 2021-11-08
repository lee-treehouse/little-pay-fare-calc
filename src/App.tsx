import { Header } from "common/Header";
import { Navigation } from "common/Navigation";
import React from "react";
import "./App.css";
import { FareCalculator } from "./views/FareCalculator";

function App() {
  return (
    <div className="App">
      <Header />
      <Navigation />
      <FareCalculator />
    </div>
  );
}

export default App;
