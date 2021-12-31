import { Header } from "common/Header";
import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { FAQ } from "views/FAQ";
import { PriceMyTrip } from "views/PriceMyTrip";
import Home from "views/Home";
import { FareCalculator } from "./views/FareCalculator";
import styles from "./App.module.css";
import { BuyProducts } from "./views/BuyProducts";
import { ThemeContext, Theme } from "theming/ThemeContext";
import Footer from "common/Footer";

function App() {
  const [theme, setTheme] = useState(Theme.Light);

  return (
    <BrowserRouter>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <div className="App">
          <div className={styles.navContainer}>
            <nav className={styles.topNav}>
              <h4>Theme</h4>
              <ul>
                <li>
                  <button disabled={theme === Theme.Light} onClick={() => setTheme(Theme.Light)}>
                    Light
                  </button>
                </li>
                <li>
                  <button
                    disabled={theme === Theme.Unicorn}
                    onClick={() => setTheme(Theme.Unicorn)}
                  >
                    Unicorn
                  </button>
                </li>
              </ul>
            </nav>
          </div>
          <Header />
          <ul className={styles.nav}>
            <li>
              <Link to="/FAQ">FAQ</Link>
            </li>
            <li>
              <Link to="/PriceMyTrip">Price My Trip</Link>
            </li>
            <li>
              <Link to="/Calculator">Fair Fare Calculator</Link>
            </li>
            <li>
              <Link to="/BuyProducts">Buy Products</Link>
            </li>
          </ul>

          <Routes>
            <Route path="/FAQ" element={<FAQ />}></Route>
            <Route path="/PriceMyTrip" element={<PriceMyTrip />}></Route>
            <Route path="/Calculator" element={<FareCalculator />}></Route>
            <Route path="/BuyProducts" element={<BuyProducts />}></Route>
            <Route path="/" element={<Home />}></Route>
          </Routes>
          <Footer></Footer>
        </div>
      </ThemeContext.Provider>
    </BrowserRouter>
  );
}

export default App;
