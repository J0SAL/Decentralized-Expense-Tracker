import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const data = {
  labels: ["Red", "Blue", "Yellow", "Green", "Purple"],
  datasets: [
    {
      label: "# of Votes",
      data: [12, 19, 3, 5, 2],
      backgroundColor: [
        "rgba(255, 99, 132, 0.2)",
        "rgba(54, 162, 235, 0.2)",
        "rgba(255, 206, 86, 0.2)",
        "rgba(75, 192, 192, 0.2)",
        "rgba(255, 159, 64, 0.2)",
      ],
      borderColor: [
        "rgba(255, 99, 132, 1)",
        "rgba(54, 162, 235, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(75, 192, 192, 1)",
        "rgba(255, 159, 64, 1)",
      ],
      borderWidth: 1,
    },
  ],
};

export const dougnnutText = {
  id: "doughnutText",
  afterDatasetDraw(chart: any, args: any, pluginOptions: any) {
    const {
      ctx,
      data,
      options,
      _active,
      chartArea: { top, bottom, left, right, width, height },
    } = chart;

    ctx.save();

    let x, y;
    if (_active && _active.length) {
      x = _active[0].element.x;
      y = _active[0].element.y;

      const dataLabel = data.labels[_active[0].index];
      const dataValue = data.datasets[0].data[_active[0].index];
      const textColor = data.datasets[0].borderColor[_active[0].index];

      ctx.font = "bold 20px sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = textColor;
      ctx.fillText(dataLabel + ": " + dataValue, x, y);
    }
  },
};

function TopIncome() {
  return (
    <div className="text-center">
      <h4>Top 5 Income Sources</h4>
      <Doughnut
        data={data}
        plugins={[dougnnutText]}
        options={{ cutout: "70%" }}
      />
    </div>
  );
}

export default TopIncome;
