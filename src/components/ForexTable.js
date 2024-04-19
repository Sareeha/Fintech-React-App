
import styles from "./ForexTable.module.css";

function Table ({ data, fxmetadata }) {
    return (
        <div>
            <table className={styles.table}>
                <thead>
                    <tr>   
                    <th>From Symbol</th>
                    <th>To Symbol</th>
                    <th>Last Refreshed</th>
                    <th>Date</th>
                    <th>Open</th>
                    <th>High</th>
                    <th>Low</th>
                    <th>Close</th>
                </tr>
            </thead>
            <tbody>
            {Object.entries(data).map(([date,values])=> ({date, ...values})).slice(0,15).map((item, index) => (
            <tr key={index}>
              <td>{fxmetadata["2. From Symbol"]}</td>
              <td>{fxmetadata["3. To Symbol"]}</td>
              <td>{fxmetadata["5. Last Refreshed"]}</td>
              <td>{item["date"]}</td>
              <td>{item["1. open"]}</td>
              <td>{item["2. high"]}</td>
              <td>{item["3. low"]}</td>
              <td>{item["4. close"]}</td>
            </tr>
             ))}
            </tbody>
            </table>
        </div>
    );
} 

export default Table;