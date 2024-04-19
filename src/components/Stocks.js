import React, { useState } from 'react';
import axios from 'axios';
import StockTable from './StockTable';
import StockChart from './StockChart'; 
import styles from './StockTable.module.css';
import stockAPI from '../api/api_stocks';

function Stock() {
  const [data, setData] = useState({});
  const [metadata, setMetadata] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [chartData, setChartData] = useState([]); 

  const apiGet = async () => {
    setIsLoading(true);
    try {
      const response = await axios.request(stockAPI);
      const monthlyData = response.data["Monthly Time Series"];
      
    
      const chartData = Object.entries(monthlyData).map(([date, values]) => ({
        date,  
        close: parseFloat(values["4. close"])  
      }));

      setData(response.data["Monthly Time Series"]);
      setMetadata(response.data["Meta Data"]);
      setChartData(chartData); 
    } catch (error) {
      console.log("❌ Error: " + error.message);
    } finally {
      setIsLoading(false);
    }
  }
//table
  return (
    <div className={styles.Stock}>
      <h1>Stock Data</h1>
      <button onClick={apiGet}>Load Stock</button>
      {isLoading && <p> ⏳ Loading...</p>}
      {chartData.length > 0 && <StockChart chartData={chartData} />} 
      <hr></hr>
      {Object.keys(data).length > 0 && Object.keys(metadata).length > 0 && (
        <StockTable data={data} metadata={metadata} />
      )}
    </div>
  );
}

export default Stock;























