// Top20Gainers.js
import styles from "./Top20Gainers.module.css";

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
  ReferenceLine,
  ComposedChart,
  Area,
  ResponsiveContainer,
} from "recharts";

function Top20Gainers({ data = [] }) {
  return (
    <div>
      <hr></hr>
      <h3>Top 20 Gainers</h3>
      <div className={styles.flexContainer}>
      <BarChart
        className={styles.flexChildChart}
        data={data}
        width={500}
        height={300}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="ticker" />
        <YAxis />
        <Tooltip />
        <Legend />
        {/* <Area type="monotone" dataKey="volume" fill="#8884d8" stroke="#8884d8" /> */}
        <Bar dataKey="price" barSize={20} fill="#413ea0" />
        {/* <Line type="monotone" dataKey="change_price" fill="#82ca9d" /> */}
      </BarChart>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Ticker</th>
            <th>Price</th>
            <th>Change (Amount)</th>
            <th>Change (%)</th>
            <th>Volume</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 &&
            data.map((item) => (
              <tr key={item.id}>
                <td>{item.ticker}</td>
                <td>{item.price}</td>
                <td>{item.change_amount}</td>
                <td>{item.change_percentage}</td>
                <td>{item.volume}</td>
              </tr>
            ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default Top20Gainers;
