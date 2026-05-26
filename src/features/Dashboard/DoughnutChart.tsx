import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  ChartOptions,
} from "chart.js";
import ContentHeading from "../../ui/ContentHeading";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

interface CenterText {
  label: string;
  value: number | string;
}

interface PieChartProps {
  heading: string;
  labels: string[];
  dataValues: number[];
  colors?: string[];
  centerText?: CenterText;
  isDark: boolean;
}

function DoughnutChart({
  heading,
  labels,
  dataValues,
  centerText,
  colors,
  isDark,
}: PieChartProps) {
  const data = {
    labels,
    datasets: [
      {
        data: dataValues,
        backgroundColor: colors || ["#21409a", "#D1E9FF"],
        borderWidth: 0,
        borderColor: "transparent",
      },
    ],
  };

  // 🌞 LIGHT BASE
  let options: ChartOptions<"doughnut"> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "60%",
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          usePointStyle: true,
          pointStyle: "circle",
          boxWidth: 8,
          boxHeight: 8,
          padding: 12,
        },
      },
    },
  };

  // 🌙 DARK MODE
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

      <div className="flex-1 flex items-center justify-center p-16">
        <div className="relative w-full h-full flex items-center justify-center">
          <Doughnut
            key={isDark ? "dark" : "light"}
            data={data}
            options={{ ...options, maintainAspectRatio: false }}
          />

          {centerText && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="flex flex-col items-center justify-center text-center">
                <p className="text-sm font-medium leading-5 text-textLightGray">
                  {centerText.label}
                </p>

                <span className="font-bold text-2xl leading-10 text-textGray">
                  {centerText.value}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DoughnutChart;
