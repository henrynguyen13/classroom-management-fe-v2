import {
  Chart as ChartJS,
  BarController,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useRef, useEffect } from "react";
import "chart.js/auto";
ChartJS.register(
  BarController,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
  Legend
);

export const UserChart = ({ userChartData, percentage }: any) => {
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstance = useRef<any>(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    if (chartRef.current) {
      const ctx = chartRef.current.getContext("2d");
      if (ctx) {
        chartInstance.current = new ChartJS(ctx, {
          type: "bar",
          data: {
            labels: [
              `Giáo viên (${
                percentage?.teachers > 0
                  ? `Tăng ${percentage?.teachers} %`
                  : `Giảm ${percentage?.teachers} %`
              })`,
              `Học sinh (${
                percentage?.students > 0
                  ? `Tăng ${percentage?.students} %`
                  : `Giảm ${percentage?.students} %`
              })`,
              `Giáo vụ (${
                percentage?.affairs > 0
                  ? `Tăng ${percentage?.affairs} %`
                  : `Giảm ${percentage?.affairs} %`
              })`,
            ],
            datasets: userChartData.datasets,
          },
          options: {
            maintainAspectRatio: false,
            scales: {
              x: {
                display: true,
                title: {
                  display: true,
                  text: "Người dùng",
                  color: "#000000",
                  font: { size: 16 },
                },
              },
              y: {
                display: true,
                beginAtZero: true,
                title: {
                  display: true,
                  text: "Total",
                  color: "#000000",
                  font: { size: 16 },
                },
                ticks: {
                  stepSize: 1,
                  callback: function (value) {
                    return value;
                  },
                },
              },
            },
            plugins: {
              tooltip: {
                enabled: true,
                callbacks: {
                  title: (tooltipItems: any) => {
                    return `User Type: ${tooltipItems[0].label}`;
                  },
                  label: (tooltipItem: any) => {
                    const dataset =
                      userChartData.datasets[tooltipItem.datasetIndex];
                    const value = dataset.data[tooltipItem.dataIndex];
                    return `${dataset.label}: ${value}`;
                  },
                },
              },
            },
          },
        });
      }
    }
  }, [userChartData]);

  return (
    <div className="">
      <div style={{ width: "100%", height: "400px" }}>
        <canvas ref={chartRef} />
        {/* <div className="text-center italic">
          Tuần từ:{" "}
          <span className="font-bold">
            {userChartData.currentWeek.start.format("DD-MM-YYYY")}{" "}
          </span>
          đến{" "}
          <span className="font-bold">
            {userChartData.currentWeek.end.format("DD-MM-YYYY")}
          </span>
        </div> */}
        {/* <div className="flex justify-between ">
          <CustomButton
            width="120px"
            text="Tuần trước"
            onClick={handlePreviousWeek}
          />
          <CustomButton
            width="120px"
            text="Tuần tới"
            onClick={handleNextWeek}
          />
        </div> */}
      </div>
    </div>
  );
};
