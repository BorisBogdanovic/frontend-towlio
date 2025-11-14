import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Title,
} from "chart.js";
import ContentHeading from "../../ui/ContentHeading";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Title
);

interface BarChartProps {
  heading?: string;
  labels: string[];
  dataValues: number[] | number[][];
  datasetLabels?: string[]; // za stacked ili višestruke serije
  colors?: string[] | string[][];
  stacked?: boolean;
}

function BarChart({
  heading,
  labels,
  dataValues,
  datasetLabels,
  colors,
  stacked = false,
}: BarChartProps) {
  // Ako je dataValues višedimenzionalni niz (za stacked)
  const datasets = Array.isArray(dataValues[0])
    ? (dataValues as number[][]).map((data, i) => ({
        label: datasetLabels?.[i] || `Dataset ${i + 1}`,
        data,
        backgroundColor: colors?.[i] || "#12B76A",
        barThickness: 50,
        borderRadius: 4,
      }))
    : [
        {
          label: datasetLabels?.[0] || heading || "Data",
          data: dataValues as number[],
          backgroundColor: colors ? (colors as string[])[0] : "#12B76A",
          barThickness: 50,
          borderRadius: 4,
        },
      ];

  const chartData = { labels, datasets };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
        align: "start" as const,
        labels: {
          usePointStyle: true,
          pointStyle: "circle" as const,
          boxWidth: 8,
          boxHeight: 8,
          padding: 12,
        },
      },
      title: { display: false },
    },
    scales: {
      x: { stacked },
      y: { stacked, beginAtZero: true },
    },
  };

  return (
    <div className="h-full border border-gray-300 rounded-lg flex flex-col">
      <ContentHeading>
        <h1>{heading}</h1>
      </ContentHeading>

      <div className="flex-1 p-4" style={{ maxHeight: "450px" }}>
        <Bar
          data={chartData}
          options={{ ...options, maintainAspectRatio: true }}
        />
      </div>
    </div>
  );
}

export default BarChart;
