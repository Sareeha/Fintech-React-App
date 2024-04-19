import styles from './Forex.module.css';
import { useState } from 'react';
import forexAPI from '../api/forexapi';
import ForexTable from "../components/ForexTable";
import axios from "axios";
 
function Forex() {
const [data, setData] = useState([]);
const [fxmetadata, setFxmetadata] = useState([]);
const [isLoading, setIsLoading] = useState(false);

const apiGet = async () => {

    setIsLoading(true);
    try {
      const response = await axios.request(forexAPI);
      console.log(response.data["Time Series FX (Daily)"]);
      
     // console.log((response["Time Series FX (Daily)"]).length);
      setData(response.data["Time Series FX (Daily)"]);   
      setFxmetadata(response.data["Meta Data"]);
      console.log(response.data["Meta Data"])
      console.log(fxmetadata);
      console.log(response.data); 
    } catch (error) {
      console.log("❌ Error:" +error.message);
    } finally {
        console.log("Load data completed");
        setIsLoading(false);
    }
  }

    return(
        <div className={ styles.Forex }>
      <h1>Product List</h1>
      <button onClick={apiGet}>Load Forex</button>
      {isLoading && <p> ⏳ Loading...</p>}
      {data && fxmetadata && <ForexTable data ={data} fxmetadata = {fxmetadata} /> }
      <hr></hr>
    </div>
    );
};

export default Forex;