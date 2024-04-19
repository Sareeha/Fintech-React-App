import React from 'react';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const StockChart = ({ chartData }) => {
  return (
    <LineChart width={800} height={400} data={chartData}>
      <Line type="monotone" dataKey="close" stroke="#8884D8" />
      <CartesianGrid stroke="#ccc" />
      <XAxis dataKey="date" />
      <YAxis label={{ value: "Close Price", angle: -90, position: "insideLeft" }} />
      <Tooltip />
      <Legend />
    </LineChart>
  );
};

export default StockChart;
