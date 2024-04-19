// zhen jian https://github.com/zjzjzjzjzjzjzj 20231010

// css
import styles from "./Crypto.module.css";
//library- function
import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
//library-styling
import { PropagateLoader, ClockLoader } from "react-spinners";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLaptopCode, faServer } from "@fortawesome/free-solid-svg-icons";
//library-chart
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  Label,
  LabelList,
} from "recharts";

function Crypto({
  crypto,
  setCrypto,
  apiOptions,
  setapiOptions,
  time,
  setTime,
  timer,
  setTimer,
  mode,
  setMode,
}) {
  // error display
  const [errorlog, setErrorlog] = useState([]);

  // ~clock function -display remaining time only
  useEffect(() => {
    let interval;
    if (mode == true) {
      // run timer only if mode is true
      interval = setInterval(() => {
        setTime((seconds) => seconds - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [mode]);

  // ~timer function in seconds, loadCrypto auto activates - useEffect if there are changes
  // ~in timer or apiOptions state

  // ~this code block is without run timer mode
  // useEffect(()=>{
  //   const interval =setInterval(()=>{
  //     loadCrypto(apiOptions);
  //     setTime(timer)} ,1000*timer);
  //   return ()=>clearInterval(interval);
  // },[timer,apiOptions]);

  useEffect(() => {
    let interval;
    if (mode == true) {
      // ~run timer only if mode is true
      interval = setInterval(() => {
        loadCrypto(apiOptions);
        setTime(timer);
      }, 1000 * timer);
      return () => clearInterval(interval);
    }
  }, [timer, apiOptions, mode]);

  // ~change clock reset - useEffect, when timer changes, time via setTime also needs to change
  useEffect(() => {
    setTime(timer);
  }, [timer]);

  // ~for loading display
  const [isLoading, setisLoading] = useState(false);

  // ~handler for timer change
  const handlerTimer = (e) => {
    setTimer(e.target.value); //~changes timer duration
    setTime(timer); //~resets the clock
  };
  // ~for choosing crypto options
  const cryptoOptions = [
    {
      name: "Bitcoin",
      value: "BTC",
    },
    {
      name: "DogeCoin",
      value: "DOGE",
    },
    {
      name: "Ethereum",
      value: "ETH",
    },
    {
      name: "Polygon",
      value: "MATIC",
    },
    {
      name: "Binance-Coin",
      value: "BNB",
    },
    {
      name: "Ripple-Coin",
      value: "XRP",
    },
    {
      name: "Cardano",
      value: "ADA",
    },
    {
      name: "Avalanche",
      value: "AVAX",
    },
    {
      name: "Thorchain",
      value: "RUNE",
    },
    { name: "SHIBA_INU", value: "SHIB" },
    { name: "Uniswap", value: "UNI" },
    { name: "Monero", value: "XMR" },
    { name: "ChainLink", value: "LINK" },
  ];

  const currencyOptions = [
    {
      name: "United States Dollar",
      value: "USD",
    },
    {
      name: "Singapore Dollars",
      value: "SGD",
    },
    {
      name: "Euro",
      value: "EUR",
    },
    {
      name: "British Pound Sterling",
      value: "GBP",
    },
    {
      name: "Canadian Dollar",
      value: "CAD",
    },
    {
      name: "Malaysian Ringgit",
      value: "MYR",
    },
    {
      name: "Chinese Yuan",
      value: "CNY",
    },
    {
      name: "Indian Rupee",
      value: "INR",
    },
    {
      name: "Australian Dollar",
      value: "AUD",
    },
    {
      name: "New Zealand Dollar",
      value: "NZD",
    },
  ];

  // ~get API function
  const loadCrypto = async () => {
    setisLoading(true);
    try {
      const response = await axios.request(apiOptions);
      // console.log(response.data);
      // console.log("Obj unpacked:",response.data["Realtime Currency Exchange Rate"])

      if (response.data["Realtime Currency Exchange Rate"]["1. From_Currency Code"] === undefined) {
        console.log("Error! Undefined")
        return
      }
      else {
        // ~array of objects
        setCrypto((prevCrypto) => [
        ...prevCrypto,
       response.data["Realtime Currency Exchange Rate"]
       ]);

      }

    } catch (error) {
      console.error(error);
      console.error(error.response.data);
      setErrorlog((preverrorlog, error) => [
        ...preverrorlog,
        [error.response.data],
      ]);
      setisLoading(false);
    } finally {
      setisLoading(false);
    }
  };

  // ~cryto selector
  const handlerChange = (e) => {
    setapiOptions((prevOptions) => ({
      ...prevOptions,
      params: { ...prevOptions.params, [e.target.name]: e.target.value },
    }));
    console.log("api optons -->0", apiOptions);
    console.log("crypto -->", apiOptions["params"]["from_currency"]);
  };

  // ~console log testing
  const handlerTest = async () => {
    setisLoading(true);
    try {
      const response = await axios.request(apiOptions);
      console.log(response.data);
      console.log(
        "Obj unpacked:",
        response.data["Realtime Currency Exchange Rate"]
      );
    } catch (error) {
      console.error(error);
      setisLoading(false);
    } finally {
      setisLoading(false);
    }
  };

  //=========================================================================================================================================
  return (
    <div className={styles.Crypto}>
      <h2>Crypto Exchange Rates</h2>

      <div name="loading" className={styles.loading}>
        <FontAwesomeIcon
          icon={faLaptopCode}
          size="2xl"
          className={styles.icon}
        />

        <div className={styles.loader}>
          <PropagateLoader loading={isLoading} color={"#0000ff"} />
        </div>

        <FontAwesomeIcon icon={faServer} size="2xl" className={styles.icon} />
      </div>

      <div name="controls" className={styles.controls}>
        <button className={styles.button} onClick={() => loadCrypto()}>Get Data</button>
        <button
          className={styles.button}
          onClick={() => {
            setCrypto([]);
            setTimer(60);
          }}
        >
          Reset Data
        </button>

        <select
          className={styles.select}
          name="from_currency"
          onChange={handlerChange}
          value={apiOptions["params"]["from_currency"]}
        >
          {cryptoOptions.map((item, index) => (
            <option key={index} value={item.value}>
              {item.name}{" "}
            </option>
          ))}
          <button type="submit">Submit</button>
        </select>

        <select
          className={styles.select}
          name="to_currency"
          onChange={handlerChange}
          value={apiOptions["params"]["to_currency"]}
        >
          {currencyOptions.map((item, index) => (
            <option key={index} value={item.value}>
              {item.name}{" "}
            </option>
          ))}
          <button type="submit">Submit</button>
        </select>
      </div>
      

      {/* Manual Testing Mode */}
      {/* <button onClick={handlerTest}>Console Log Test</button> */}

      <div className={styles.timer}>
        <p>
          Logging mode auto loads in <span className={styles.time}>{time >= 0 ? time : "Standby ..."}  </span> seconds
        </p>
        <div>
          <ClockLoader loading={mode} color={"#0000ff"} />
          {mode == true ? null : <p style={{ color: "red", 
                                              fontSize:"18px", 
                                              fontWeight:"bold",
                                              textShadow:"1px 1px grey" }}> Paused! Comparison Mode</p>}
        </div>
      </div>
      
      <div className={styles.toggler}>
        <button
          className={styles.button}
          onClick={() => {
            setMode(!mode);
          }}
        >
          Mode Toggle
        </button>

        <select className={styles.select} name="timer" onChange={handlerTimer} value={timer}>
          <option value={60}>1 minute</option>
          <option value={180}>3 minutes</option>
          <option value={300}>5 minutes</option>
          <option value={600}>10 minutes</option>
          <option value={3600}>1 hour</option>
          <option value={15}>DEMO 15 secs</option>
        </select>
      </div>

      

      <table>
        <tr>
          <th>#</th>
          <th>Crypto Code</th>
          <th>Cypto Name</th>
          {/* <th>Currency Code</th> */}
          <th>Currency Name</th>
          <th>Exchange Rate</th>
          <th>Time</th>
          <th>Time Zone</th>
          <th>Bid Price</th>
          <th>Ask Price</th>
        </tr>
        {crypto.length>0 && crypto[crypto.length-1]["1. From_Currency Code"] !== undefined ? 
        
          crypto.map((item, keys) => (
            <tr key={keys}>
              <td>{keys + 1}</td>
              <td>{item["1. From_Currency Code"]}</td>
              <td>{item["2. From_Currency Name"]}</td>
              {/* <td>{item["3. To_Currency Code"]}</td> */}
              <td>{item["4. To_Currency Name"]}</td>
              <td>{parseFloat(item["5. Exchange Rate"]).toFixed(2)}</td>
              <td>{item["6. Last Refreshed"]}</td>
              <td>{item["7. Time Zone"]}</td>
              <td>{`${item["3. To_Currency Code"]}  ${parseFloat(
                item["8. Bid Price"]
              ).toFixed(2)}`}</td>
              <td>{`${item["3. To_Currency Code"]}  ${parseFloat(
                item["9. Ask Price"]
              ).toFixed(2)}`}</td>
            </tr>
          ))
              :
                <tr >
                <td> </td>
                <td>No data </td>
                <td>No data </td>
                {/* <td>{item["3. To_Currency Code"]}</td> */}
                <td>No data </td>
                <td>No data </td>
                <td>No data </td>
                <td>No data </td>
                <td>No data </td>
                <td>No data </td>
              </tr>}
         <tr>
          <th>#</th>
          <th>Crypto Code</th>
          <th>Cypto Name</th>
          {/* <th>Currency Code</th> */}
          <th>Currency Name</th>
          <th>Exchange Rate</th>
          <th>Time</th>
          <th>Time Zone</th>
          <th>Bid Price</th>
          <th>Ask Price</th>
        </tr>
      </table>

      <div className={styles.timer}>
        <p>
          Logging mode auto loads in <span className={styles.time}>{time >= 0 ? time : "Standby ..."}  </span> seconds
        </p>
        <div>
          <ClockLoader loading={mode} color={"#0000ff"} />
          {mode == true ? null : <p style={{ color: "red", 
                                              fontSize:"18px", 
                                              fontWeight:"bold",
                                              textShadow:"1px 1px grey" }}> Paused! Comparison Mode</p>}
        </div>
      </div>

      {mode && (
        <div>
          <h4 style={{textDecoration:"underline" , fontSize:"25px"}}> Auto Logging Mode</h4>
          <LineChart
            width={1200}
            height={700}
            data={crypto}
            className={styles.chart}
            margin={{ top: 80, right: 30, left: 20, bottom: 5 }}
          >
            <Line type="monotone" dataKey="8. Bid Price" stroke="#8884d8">
              <LabelList
                dataKey="2. From_Currency Name"
                position="top"
                angle="-90"
                offset="50"
              ></LabelList>
            </Line>
            <Line type="monotone" dataKey="9. Ask Price" stroke="#82ca9d" />
            <CartesianGrid stroke="#ccc" />
            <XAxis dataKey="6. Last Refreshed">
              <Label value="UTC Date Time" offset={0} position="insideBottom" />
            </XAxis>
            <YAxis
              label={{ value: "PRICE", angle: -90, position: "insideLeft" }}
            />
            <Legend />
            <Tooltip />
          </LineChart>
        </div>
      )}

      {!mode && (
        <div>
          <h4 style={{textDecoration:"underline" , fontSize:"25px"}}> Comparison Mode</h4>
          {/* <ResponsiveContainer width="100%" height="100%"> */}
          <BarChart
            className={styles.chart}
            width={1200}
            height={700}
            data={crypto}
            margin={{
              top: 80,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="2. From_Currency Name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar
              type="monotone"
              dataKey="8. Bid Price"
              fill="#8884d8"
              minPointSize={5}
            >
              <LabelList
                dataKey="3. To_Currency Code"
                offset={20}
                angle="-90"
                position="insideTop"
              ></LabelList>
              <LabelList
                dataKey="5. Exchange Rate"
                offset={40}
                angle="-90"
                position="top"
              ></LabelList>
            </Bar>
            <Bar
              type="monotone"
              dataKey="9. Ask Price"
              fill="#82ca9d"
              minPointSize={5}
            >
              <LabelList
                dataKey="3. To_Currency Code"
                offset={20}
                angle="-90"
                position="insideTop"
              ></LabelList>
              <LabelList
                dataKey="9. Ask Price"
                offset={40}
                angle="-90"
                position="top"
              ></LabelList>
            </Bar>
          </BarChart>
          {/* </ResponsiveContainer> */}
        </div>
      )}

      <h4 style = {{color:"white"}}>Zhen Jian completed 20231011 https://github.com/zjzjzjzjzjzjzj</h4>
    </div>
  );
}

export default Crypto;

/*
Data Type
{
  "Realtime Currency Exchange Rate": {
    "1. From_Currency Code": "BTC",
    "2. From_Currency Name": "Bitcoin",
    "3. To_Currency Code": "USD",
    "4. To_Currency Name": "United States Dollar",
    "5. Exchange Rate": "10347.92000000",
    "6. Last Refreshed": "2020-02-12 19:05:01",
    "7. Time Zone": "UTC",
    "8. Bid Price": "10347.91000000",
    "9. Ask Price": "10348.63000000"
  }
}


AxiosError
code
: 
"ERR_BAD_REQUEST"
config
: 
{transitional: {…}, adapter: Array(2), transformRequest: Array(1), transformResponse: Array(1), timeout: 0, …}
message
: 
"Request failed with status code 429"
name
: 
"AxiosError"
request
: 
XMLHttpRequest {onreadystatechange: null, readyState: 4, timeout: 0, withCredentials: false, upload: XMLHttpRequestUpload, …}
response
: 
config
: 
{transitional: {…}, adapter: Array(2), transformRequest: Array(1), transformResponse: Array(1), timeout: 0, …}
data
: 
{message: 'You have exceeded the rate limit per minute for your plan, BASIC, by the API provider'}
headers
: 
AxiosHeaders {access-control-allow-credentials: 'true', access-control-allow-origin: 'http://localhost:3000', access-control-expose-headers: 'x-ratelimit-limit, x-ratelimit-remaining, x-rateli…-allow-credentials, access-control-expose-headers', content-type: 'application/json', date: 'Sun, 08 Oct 2023 13:48:41 GMT', …}
request
: 
XMLHttpRequest
onabort
: 
ƒ handleAbort()
length
: 
0
name
: 
"handleAbort"
prototype
: 
{constructor: ƒ}
arguments
: 
(...)
caller
: 
(...)
[[FunctionLocation]]
: 
xhr.js:80
[[Prototype]]
: 
ƒ ()
[[Scopes]]
: 
Scopes[5]
onerror
: 
ƒ handleError()
onload
: 
null
onloadend
: 
ƒ onloadend()
onloadstart
: 
null
onprogress
: 
null
onreadystatechange
: 
null
ontimeout
: 
ƒ handleTimeout()
readyState
: 
4
response
: 
"{\"message\":\"You have exceeded the rate limit per minute for your plan, BASIC, by the API provider\"}"
responseText
: 
"{\"message\":\"You have exceeded the rate limit per minute for your plan, BASIC, by the API provider\"}"
responseType
: 
""
responseURL
: 
"https://alpha-vantage.p.rapidapi.com/query?from_currency=SHIB&function=CURRENCY_EXCHANGE_RATE&to_currency=SGD"
responseXML
: 
null
status
: 
429
statusText
: 
""
timeout
: 
0
upload
: 
XMLHttpRequestUpload {onloadstart: null, onprogress: null, onabort: null, onerror: null, onload: null, …}
withCredentials
: 
false
[[Prototype]]
: 
XMLHttpRequest
status
: 
429
statusText
: 
""
[[Prototype]]
: 
Object
stack
: 
"AxiosError: Request failed with status code 429\n    at settle (http://localhost:3000/static/js/bundle.js:99136:12)\n    at XMLHttpRequest.onloadend (http://localhost:3000/static/js/bundle.js:97822:66)"
[[Prototype]]
: 
Error

*/
