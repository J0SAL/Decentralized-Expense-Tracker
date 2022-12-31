import React, { useContext, useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import dataContext from "../../context/DataContext/dataContext";

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ["Income", "Expense"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19],
      backgroundColor: ["rgba(54, 162, 235, 0.2)", "rgba(255, 99, 132, 0.2)"],
      borderColor: ["rgba(54, 162, 235, 1)", "rgba(255, 99, 132, 1)"],
      borderWidth: 1,
    },
  ],
};

export function PieChart() {
  const [piedata, setPieData] = useState(data);
  const { overview } = useContext(dataContext);
  useEffect(() => {
    data.datasets[0].data = [overview.income, overview.expense];
    setPieData(data);
  }, [overview]);

  return (
    <div>
      <h4 className="d-flex justify-content-center">
        You Balance: ₹ {overview.income - overview.expense}
      </h4>
      <Pie data={piedata} />
    </div>
  );
}
