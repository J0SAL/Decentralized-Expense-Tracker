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
      backgroundColor: "rgba(71, 245, 39, 0.25)",
      borderColor: "#15b310",
    },
    {
      label: "Expenses",
      data: labels.map(() => 0),
      fill: false,
      lineTension: 0.3,
      borderColor: "#fc0339",
      backgroundColor: "#ff91ad",
    },
  ],
};

function LineChart() {
  const { overview, yearExpenses, yearIncomes } = useContext(dataContext);
  const [chartData, setChartData] = useState(data);

  useEffect(() => {
    let tempdataset = [...chartData.datasets];
    tempdataset[0] = {
      ...tempdataset[0],
      ["data"]: yearIncomes,
    };
    tempdataset[1] = {
      ...tempdataset[1],
      ["data"]: yearExpenses,
    };

    setChartData({
      ...chartData,
      datasets: tempdataset,
    });
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
