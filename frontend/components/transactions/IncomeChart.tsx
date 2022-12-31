import React, { useContext, useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import dataContext from "../../context/DataContext/dataContext";
import { incomeColor } from "../../constants/categories";
ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ["No Color"],
  datasets: [
    {
      label: "amount",
      data: [0],
      backgroundColor: ["white"],
    },
  ],
};
function IncomeChart() {
  const { overview, incomes } = useContext(dataContext);
  const [chartData, setChartData] = useState(data);
  useEffect(() => {
    data.labels = Object.keys(incomes);
    data.datasets[0].data = Object.values(incomes);
    data.datasets[0].backgroundColor = Object.keys(incomes).map(
      (cat: string) => incomeColor[cat]
    );
    setChartData(data);
  }, [incomes]);

  return (
    <div>
      <h4 className="d-flex justify-content-center">
        Total Income: ₹ {overview.income}
      </h4>
      <Pie data={chartData} />
    </div>
  );
}

export default IncomeChart;
