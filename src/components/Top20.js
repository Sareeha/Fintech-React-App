import styles from "./Top20.module.css";
// import apiTop20 from "../api/api_top20js";

import Top20Table from "./Top20Table";
import apiTop20 from "../api/apiTop20.js";

import { useEffect, useState } from "react";
import axios from "axios";
import Top20MostActive from "./Top20MostActive";
// useEffect: can fetch data without clicking button
function Top20() {
  // usestates here
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.request(apiTop20);
      // const response = await axios.request(apiTop20);
      console.log(response);
      setData(response.data);
      // console.log(data)
      // gotta access the inside of data, even .length produces an error
    } catch (error) {
      console.log("❌ error: " + error.message);
    } finally {
      console.log("Load data completed");
      setIsLoading(false);
    }
  };

 
  return (
    <div className={styles.Top20}>
      <h1>Top 20 Gainers and Losers</h1>
      <h4>Last Updated: {data.last_updated}</h4>
      <button onClick={loadData}>Load Data</button>
      {isLoading && <p>⏳ Loading...</p>}
      <Top20Table list={data} />
    </div>
  );
}

export default Top20;
