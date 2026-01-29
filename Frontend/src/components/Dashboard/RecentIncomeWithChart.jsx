/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import CustomPieChart from "../Charts/CustomPieChart";

const COLORS = [
  "#875CF5", // purple
  "#FA2C37", // red
  "#FF6900", // orange
  "#4F39F6", // indigo
  "#00C2FF", // bright sky blue
  "#00E396", // fresh teal green
  "#FEB019", // warm amber
  "#A3E635", // lime green pop
  "#2563EB", // confident blue
  "#14B8A6", // teal
  "#10B981", // emerald
  "#EC4899", // pink rose
  "#84CC16", // lime (muted)
  "#06B6D4", // cyan
];

const RecentIncomeWithChart = ({ data, totalIncome }) => {
  const [chartData, setChartData] = useState([]);

  const prepareChartData = () => {
    const dataArr = data?.map((item) => ({
      name: item?.source,
      amount: item?.amount,
    }));

    setChartData(dataArr);
  };

  useEffect(() => {
    prepareChartData();

    return () => {};
  }, [data]);

  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg font-semibold">Last 60 Days Income</h5>
      </div>

      <CustomPieChart
        data={chartData}
        label="Total Income"
        totalAmount={`$${totalIncome}`}
        showTextAnchor
        colors={COLORS}
      />
    </div>
  );
};

export default RecentIncomeWithChart;
