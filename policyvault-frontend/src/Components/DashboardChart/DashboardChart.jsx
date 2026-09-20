import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

import { Doughnut } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

function DashboardChart({dashboard}) {

  const data = {
    labels: [
      "Active",
      "Matured"
    ],

    datasets: [
      {
        data: [
          dashboard.premiumDue,
          dashboard.maturitySoon
        ],

        backgroundColor: [
          "#3F1F5D",
          "#C8B6FF"
        ]
      }
    ]
  };

  return <Doughnut data={data} />;
}

export default DashboardChart;