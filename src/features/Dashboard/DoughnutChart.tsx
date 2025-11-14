import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, Title } from "chart.js";
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
}

function DoughnutChart({
  heading,
  labels,
  dataValues,
  centerText,
  colors,
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

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "60%",
    plugins: {
      legend: {
        position: "bottom" as const,
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

  return (
    <div className="h-full border border-gray-300 rounded-lg flex flex-col">
      <ContentHeading>
        <h1>{heading}</h1>
      </ContentHeading>

      <div className="flex-1 flex items-center justify-center p-16">
        <div className="relative w-full h-full flex items-center justify-center">
          <Doughnut
            data={data}
            options={{ ...options, maintainAspectRatio: false }}
          />
          {centerText && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="flex flex-col items-center justify-center text-center">
                <p className="text-sm text-textLightGray font-medium leading-5">
                  {centerText.label}
                </p>
                <span className="text-textGray font-bold text-2xl leading-10 ">
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
