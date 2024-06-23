import {
  Chart as ChartJS,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend,
} from "chart.js";
import { useRef, useEffect } from "react";
import dayjs from "dayjs";
import "chart.js/auto";
ChartJS.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  CategoryScale,
  Tooltip,
  Legend
);

export const VisitChart = ({ chartData, currentWeek }: any) => {
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
          type: "line",
          data: chartData,
          options: {
            maintainAspectRatio: false,
            scales: {
              x: {
                display: true,
                title: {
                  display: true,
                  text: "Ngày",
                  color: "#000000",
                  font: { size: 16 },
                },
                ticks: {
                  callback: function (value) {
                    return value;
                  },
                },
              },
              y: {
                display: true,
                beginAtZero: true,
                title: {
                  display: true,
                  text: "Số lượng người truy cập",
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
            responsive: true,
            elements: {
              point: {
                radius: 5,
                hoverRadius: 8,
              },
            },
            plugins: {
              tooltip: {
                enabled: true,
                callbacks: {
                  title: (tooltipItems: any) => {
                    const dateIndex = tooltipItems[0]?.dataIndex;
                    const weekStartDate = dayjs(currentWeek.start);
                    const dayOfWeek = weekStartDate
                      .add(dateIndex, "day")
                      .format("DD-MM-YYYY");
                    return `Ngày: ${dayOfWeek}`;
                  },
                  label: (tooltipItem: any) => {
                    const value = tooltipItem.raw.toFixed(0);
                    return `Số lượng người truy cập: ${value}`;
                  },
                },
              },
            },
          },
        });
      }
    }
  }, [chartData]);

  return (
    <div className=" ">
      <div style={{ width: "100%", height: "400px" }}>
        <canvas ref={chartRef} />
      </div>
    </div>
  );
};
