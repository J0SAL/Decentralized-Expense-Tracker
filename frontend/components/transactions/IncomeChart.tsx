import React, { useContext, useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import dataContext from "../../context/DataContext/dataContext";
import { incomeColor } from "../../constants/categories";
import Image from "next/image";
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
    setChartData({
      labels: Object.keys(incomes),
      datasets: [
        {
          label: "Amount",
          data: Object.values(incomes),
          backgroundColor: Object.keys(incomes).map(
            (cat: string) => incomeColor[cat as keyof typeof incomeColor]
          ),
        },
      ],
    });
  }, [incomes]);

  return (
    <div>
      <h4 className="d-flex justify-content-center">
        Total Income: ₹ {overview.income}
      </h4>
      {overview.income === 0 ? (
        <img
          src="/images/no_transactions.svg"
          alt="no data"
          width={"80%"}
          height={"80%"}
        />
      ) : (
        <Pie data={chartData} />
      )}
    </div>
  );
}

export default IncomeChart;
