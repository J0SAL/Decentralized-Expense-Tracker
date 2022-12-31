import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import React, { useContext, useEffect, useState } from "react";
import dataContext from "../../context/DataContext/dataContext";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const labels = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const data = {
  labels,
  datasets: [
    {
      label: "Income",
      data: labels.map(() => 0),
      fill: true,
      lineTension: 0.3,
      backgroundColor: "#d6b0f5",
      borderColor: "#9647d6",
    },
    {
      label: "Expenses",
      data: labels.map(() => 0),
      lineTension: 0.3,
      borderColor: "#fc0339",
      backgroundColor: "#d6b0f5",
    },
  ],
};

function LineChart() {
  const { overview, yearExpenses, yearIncomes } = useContext(dataContext);
  const [chartData, setChartData] = useState(data);

  useEffect(() => {
    data.datasets[0].data = Object.values(yearIncomes);
    data.datasets[1].data = Object.values(yearExpenses);
    setChartData(data);
  }, [yearExpenses, yearIncomes]);
  return (
    <Line
      data={chartData}
      options={{
        responsive: true,
        plugins: {
          legend: {
            position: "top",
          },
          title: {
            display: false,
          },
        },
      }}
    />
  );
}
export default LineChart;
