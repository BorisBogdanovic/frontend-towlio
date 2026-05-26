import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Title,
  ChartOptions,
} from "chart.js";
import ContentHeading from "../../ui/ContentHeading";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
  Title,
);

interface BarChartProps {
  heading?: string;
  labels: string[];
  dataValues: number[] | number[][];
  datasetLabels?: string[];
  colors?: string[] | string[][];
  darkColors?: string[] | string[][]; // 🔥 DARK BOJE
  stacked?: boolean;
  isDark: boolean;
  barThickness?: number;
}

function BarChart({
  heading,
  labels,
  dataValues,
  datasetLabels,
  colors,
  darkColors,
  stacked = false,
  isDark,
  barThickness = 50,
}: BarChartProps) {
  const finalColors = isDark
    ? darkColors || ["#22c55e", "#86efac"] // 🔥 2 BOJE
    : colors || ["#12B76A", "#D1FADF"];

  const datasets = Array.isArray(dataValues[0])
    ? (dataValues as number[][]).map((data, i) => ({
        label: datasetLabels?.[i] || `Dataset ${i + 1}`,
        data,
        backgroundColor: Array.isArray(finalColors)
          ? finalColors[i] || finalColors[0]
          : finalColors,
        barThickness,
        borderRadius: 6,
      }))
    : [
        {
          label: datasetLabels?.[0] || heading || "Data",
          data: dataValues as number[],
          backgroundColor: Array.isArray(finalColors)
            ? finalColors[0]
            : finalColors,
          barThickness,
          borderRadius: 6,
        },
      ];

  const chartData = { labels, datasets };

  // 🌞 LIGHT OPTIONS
  let options: ChartOptions<"bar"> = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        align: "start",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          boxWidth: 8,
          boxHeight: 8,
          padding: 12,
        },
      },
      title: { display: false },
    },
    scales: {
      x: { stacked },
      y: {
        stacked,
        beginAtZero: true,
      },
    },
  };

  // 🌙 DARK OPTIONS
  if (isDark) {
    options = {
      ...options,
      plugins: {
        ...options.plugins,
        legend: {
          ...options.plugins?.legend,
          labels: {
            ...options.plugins?.legend?.labels,
            color: "#e2e8f0",
          },
        },
      },
      scales: {
        x: {
          ...options.scales?.x,
          ticks: { color: "#e2e8f0" },
          grid: { color: "rgba(255,255,255,0.08)" },
        },
        y: {
          ...options.scales?.y,
          ticks: { color: "#e2e8f0" },
          grid: { color: "rgba(255,255,255,0.08)" },
        },
      },
    };
  }

  return (
    <div
      className={`
        h-full rounded-lg flex flex-col
        ${
          isDark
            ? "border border-transparent bg-[#071222] shadow-[inset_0_0_0_1px_rgba(59,130,246,0.18),0_0_20px_rgba(59,130,246,0.08)]"
            : "border border-gray-300 bg-white"
        }
      `}
    >
      <ContentHeading isDark={isDark}>
        <h1>{heading}</h1>
      </ContentHeading>

      <div className="flex-1 p-4" style={{ maxHeight: "450px" }}>
        <Bar
          key={isDark ? "dark" : "light"}
          data={chartData}
          options={{ ...options, maintainAspectRatio: true }}
        />
      </div>
    </div>
  );
}

export default BarChart;
