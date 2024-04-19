//css
import styles from "./Main.module.css";

//components
import Home from "./Home";
import Stocks from "./Stocks";
import Crypto from "./Crypto";
import Top20 from "./Top20";
import Forex from "./Forex";

//library
import {
  Link,
  Routes,
  Route,
  useNavigate,
  BrowserRouter,
} from "react-router-dom";
import React, { useState, useEffect } from "react";

function Main() {
  // ===================================================================================================
  // For Crypto Function - Keep in Main component so the states persists when changing navigation - Jian
  // ===================================================================================================
  // zhen jian https://github.com/zjzjzjzjzjzjzj 20231010

  const [crypto, setCrypto] = useState([]);
  const [apiOptions, setapiOptions] = useState({
    method: "GET",
    url: "https://alpha-vantage.p.rapidapi.com/query",
    params: {
      from_currency: "BTC",
      function: "CURRENCY_EXCHANGE_RATE",
      to_currency: "USD",
    },
    headers: {
      "X-RapidAPI-Key": "c4fedd50f1msh06e01901e0e0c05p13c0fejsn99ecc7eed1df",
      "X-RapidAPI-Host": "alpha-vantage.p.rapidapi.com",
    },
  });
  const [timer, setTimer] = useState(60); //timer
  const [time, setTime] = useState(timer); //clock
  const [mode, setMode] = useState(true); //comparison mode

  // ===================================================================================================
  // For Home Function - Keep in Main component so the states persists when changing navigation - Jian
  // ===================================================================================================

  const [isloggedin, setIsloggedin] = useState(false);

  //========================================================================================================
  return (
    <div className={styles.Main}>
      {isloggedin && <div className={styles.header}> <h1> SCTP Cohort 4 Group 5 Finance App</h1> </div>}
      <BrowserRouter>
        {isloggedin && (
          <nav className={styles.navbar}>
            <Link className={styles.link} to="/">
              Home
            </Link>
            <Link className={styles.link} to="/crypto">
              Crypto
            </Link>
            <Link className={styles.link} to="/stocks">
              Stocks
            </Link>
            <Link className={styles.link} to="/Top20">
              Top20
            </Link>
            <Link className={styles.link} to="/forex">
              Forex
            </Link>
          </nav>
        )}
        <Routes>
          <Route
            path="/"
            element={
              <Home isloggedin={isloggedin} setIsloggedin={setIsloggedin} />
            }
          />
          <Route
            path="/crypto"
            element={
              <Crypto
                crypto={crypto}
                setCrypto={setCrypto}
                apiOptions={apiOptions}
                setapiOptions={setapiOptions}
                timer={timer}
                setTimer={setTimer}
                time={time}
                setTime={setTime}
                mode={mode}
                setMode={setMode}
              />
            }
          />
          <Route path="/stocks" element={<Stocks />} />
          <Route path="/Top20" element={<Top20 />} />
          <Route path="/forex" element={<Forex />} />
        </Routes>
      </BrowserRouter>

      {isloggedin ? (
        <div className={styles.footer}>
          <h3 style={{color:"green"}}> Logged: IN </h3>
        </div>
      ) : (
        <div className={styles.footer}>
          <h3> Logged: OUT</h3>
        </div>
      )}

    </div>
  );
}

export default Main;