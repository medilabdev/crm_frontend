import React from "react";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import { faker } from "@faker-js/faker";

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
);

const labels = ["January", "February", "March", "April", "May", "June", "July"];

export const data = {
  labels,
  datasets: [
    {
      type: "line",
      label: "Dataset 1",
      borderColor: "rgb(48, 129, 208)",
      borderWidth: 2,
      fill: false,
      data: labels.map(() => faker.datatype.number({ max: 1000 })),
    },
    {
      type: "bar",
      label: "Dataset 2",
      backgroundColor: "rgb(7, 102, 173)",
      data: labels.map(() => faker.datatype.number({ max: 1000 })),
      borderColor: "white",
      borderWidth: 2,
    },
    {
      type: "bar",
      label: "Dataset 3",
      backgroundColor: "rgb(5, 191, 219)",
      data: labels.map(() => faker.datatype.number({ max: 1000 })),
    },
  ],
};

export function ChartWinLose() {
  return <Chart type="bar" data={data} />;
}
