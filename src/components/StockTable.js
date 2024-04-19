import React from 'react';
import styles from './StockTable.module.css';

function StockTable({ data, metadata }) {
  return (
    <div>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Last Refreshed</th>
            <th>Date</th>
            <th>Open</th>
            <th>High</th>
            <th>Low</th>
            <th>Close</th>
            <th>Volume</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(data).map(([date, values]) => (
            <tr key={date}>
              <td>{metadata["2. Symbol"]}</td>
              <td>{metadata["3. Last Refreshed"]}</td>
              <td>{date}</td>
              <td>{values["1. open"]}</td>
              <td>{values["2. high"]}</td>
              <td>{values["3. low"]}</td>
              <td>{values["4. close"]}</td>
              <td>{values["5. volume"]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StockTable;


