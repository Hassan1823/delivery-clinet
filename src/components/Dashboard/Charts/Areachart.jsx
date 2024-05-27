import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const InventoryLevelChart = (data) => {
  const [dataSet, setDataSet] = useState([]);
  const [dates, setDates] = useState([]);

  useEffect(() => {
    if (!dataSet || dataSet.length === 0) {
      setDataSet(data?.data.slice(0, 5).map((item) => item.quantity));
    }
    if (!dates || dates.length === 0) {
      setDates(data?.data.slice(0, 4).map((item) => item.createdAt));
    }
  }, [dataSet, dates]);

  // console.log("dates :::", dates);

  const sampleData = [100, 120, 80, 150, 110];

  const getLastFourDays = () => {
    const today = new Date();
    const dates = [];

    for (let i = 0; i < 5; i++) {
      const date = new Date(today);
      date.setDate(date.getDate() - i); // Subtract i days from today
      dates.push(date.toISOString().split("T")[0]); // Push the date in YYYY-MM-DD format
    }

    return dates;
  };

  const sampleDates = getLastFourDays();
  // console.log(sampleDates);
  // const sampleDates = [
  //   "2024-02-01T00:00:00.000Z",
  //   "2024-02-02T00:00:00.000Z",
  //   "2024-02-03T00:00:00.000Z",
  //   "2024-02-04T00:00:00.000Z",
  //   "2024-02-05T00:00:00.000Z",
  // ];
  const chartOptions = {
    chart: {
      type: "area",
      height: 350,
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      type: "datetime",
      // categories: dates && dates.length !== 0 ? dates : sampleDates,
      categories: sampleDates,
    },
    title: {
      text: "Inventory Level",
      align: "left",
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"], // Alternating row colors
        opacity: 0.5,
      },
    },
  };

  const chartSeries = [
    {
      name: "Inventory Level",
      data: dataSet && dataSet.length !== 0 ? dataSet : sampleData, // Add your inventory level data
    },
  ];

  return (
    <div className="w-3/4 ">
      <ReactApexChart options={chartOptions} series={chartSeries} type="area" />
    </div>
  );
};

export default InventoryLevelChart;
