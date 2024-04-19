import styles from './Forex.module.css';
import { useState, useEffect } from 'react';
import ForexTable from "./ForexTable";
import ForexChart from "./ForexChart";
import axios from "axios";


 
function Forex() {

const [forexAPI, setforexAPI] = useState({ method: 'GET',
url: 'https://alpha-vantage.p.rapidapi.com/query',
params: {
  from_symbol: 'EUR',
  function: 'FX_DAILY',
  to_symbol: 'USD',
  outputsize: 'compact',
  datatype: 'json'
},
headers: {
  'X-RapidAPI-Key': '23133210ecmsh5d669ddcf54d2c7p1068dajsnc84e8b19ba5f',
  'X-RapidAPI-Host': 'alpha-vantage.p.rapidapi.com'
},
});

const [data, setData] = useState([]);
const [fxmetadata, setFxmetadata] = useState([]);
const [fxchartData, setFxchartData] = useState([]);

const [isLoading, setIsLoading] = useState(false);

// for choosing currency options
const currencyList = [
 { 
   name: " 🇸🇬 Singapore Dollar",
   value: "SGD",
  },
 {
    name: " 🇺🇸 US Dollar",
    value: "USD",
 },
 {
   name: " 🇪🇺 EURO",
   value: "EUR",
 },
 {
   name: " 🇯🇵 Japanese Yen",
   value: "JPY"
 },
 {
  name: " 🇬🇧 British Pound",
  value:"GBP"
 },
 {
  name: " 🇮🇳 Indian Rupees",
  value: "INR"
 },
 {
  name:" 🇲🇾 Malaysian Ringgit",
  value: "MYR"
 },
 {
   name:" 🇨🇳 Chinese Yuan",
   value:"CNY"
 },
 {
   name:" 🇷🇺 Russian Ruble",
   value:"RUB"
 },
 {
  name:" 🇦🇪 United Arab Diraham",
  value: "AED"
 },
];

  const apiGet = async () => {

    setIsLoading(true);
    try {
      const response = await axios.request(forexAPI);
      console.log(response.data["Time Series FX (Daily)"]);

      setData(response.data["Time Series FX (Daily)"]);   
      
      const fxchartData = Object.keys(response.data['Time Series FX (Daily)']).map(date => ({
        date,
        '1. open': parseFloat(response.data['Time Series FX (Daily)'][date]['1. open']),
        '2. high': parseFloat(response.data['Time Series FX (Daily)'][date]['2. high']),
        '3. low': parseFloat(response.data['Time Series FX (Daily)'][date]['3. low']),
        '4. close': parseFloat(response.data['Time Series FX (Daily)'][date]['4. close']),
      }));
      
     setFxmetadata(response.data["Meta Data"]);
     setFxchartData(fxchartData);

      console.log(fxchartData);
      
    } catch (error) {
      console.log("❌ Error:" +error.message);
    } finally {
        console.log("Load data completed");
        setIsLoading(false);
    }
  }

  const handlerChange = (e) => {
    console.log(e.target.name)
    console.log(e.target.value)
    setforexAPI ((prevforexApi) =>
    ({...prevforexApi,
     params: {...prevforexApi.params, [e.target.name] : e.target.value}})
     )
     console.log("Line 100")
     console.log(forexAPI)
  };
  

  return (
    <div className={ styles.Forex }>
      <h1>FOREX CURRENCY EXCHANGE RATES</h1>

      <div className={styles.controls}>
      <select
          className={styles.select}
          name="from_symbol"
          onChange={handlerChange}
          value={forexAPI["params"]["from_symbol"]}
        >
          {currencyList.map((item, index) => (
            <option key={index} value={item.value}>
              {item.name}{" "}
            </option>
          ))}
          <button type="submit">Submit</button>
        </select>

        <select
          className={styles.select}
          name="to_symbol"
          onChange={handlerChange}
          value={forexAPI["params"]["to_symbol"]}
        >
          {currencyList.map((item, index) => (
            <option key={index} value={item.value}>
              {item.name}{" "}
            </option>
          ))}
          <button type="submit">Submit</button>
        </select>
        </div>
      <button  className={styles.button} onClick={apiGet}> Load Forex </button>
      {isLoading && <p> ⏳ Loading...</p>}
      {data && fxmetadata && <ForexTable data ={data} fxmetadata = {fxmetadata} /> }
      <hr></hr>
      {fxchartData && <ForexChart fxchartData ={fxchartData} /> }

    </div>
  );
};

export default Forex;