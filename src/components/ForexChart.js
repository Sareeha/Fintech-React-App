import {
    LineChart,
    Line,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
  } from "recharts";

  function ForexChart({ fxchartData }) {
    console.log(fxchartData);
    return (
        <div>
<div>
<LineChart width={800} height={400} data={fxchartData}>
<CartesianGrid stroke="#eee" strokeDasharray="3 3"/>
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="1. open" stroke="#8884d8" activeDot={{ r: 2 }} name="Open" />
      <Line type="monotone" dataKey="2. high" stroke="#82ca9d" name="High" />
      <Line type="monotone" dataKey="3. low" stroke="#ffc658" name="Low" />
      <Line type="monotone" dataKey="4. close" stroke="#f50057" name="Close" />
    </LineChart>
        </div>

        </div>
    )
  }

  export default ForexChart;