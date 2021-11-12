import { Header } from "common/Header";
import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { FAQ } from "views/FAQ";
import Home from "views/Home";
import { FareCalculator } from "./views/FareCalculator";
import styles from "./App.module.css";
import { ThemeContext, Theme } from "theming/ThemeContext";

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
          <ul>
            <li>
              <Link to="/FAQ">FAQ</Link>
            </li>
            <li>
              <Link to="/Calculator">Fair Fare Calculator</Link>
            </li>
          </ul>

          <Routes>
            <Route path="/FAQ" element={<FAQ />}></Route>
            <Route path="/Calculator" element={<FareCalculator />}></Route>
            <Route path="/" element={<Home />}></Route>
          </Routes>
        </div>
      </ThemeContext.Provider>
    </BrowserRouter>
  );
}

export default App;
