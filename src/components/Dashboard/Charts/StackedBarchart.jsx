import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const TopSellingProductsChart = (data) => {
  const [productNames, setProductNames] = useState([]);
  const [productPurchased, setProductPurchased] = useState([]);
  const [productSold, setProductSold] = useState([]);
  const sampleProducts = [
    "Product A",
    "Product B",
    "Product C",
    "Product D",
    "Product E",
  ];
  const samplePurchased = [30, 40, 45, 50, 60];
  const sampleSold = [25, 35, 40, 45, 55];

  useEffect(() => {
    if (!productNames || productNames.length === 0) {
      setProductNames(
        data?.data
          .slice(data?.data.length - 6, data?.data.length - 1)
          .map((item, idx) => item?.productName || `Item${idx}`)
      );
    }
    if (!productPurchased || productPurchased.length === 0) {
      setProductPurchased(
        data?.data
          .slice(data?.data.length - 6, data?.data.length - 1)
          .map((item, idx) => item?.quantity || idx)
      );
    }
    if (!productSold || productSold.length === 0) {
      setProductSold(
        data?.data
          .slice(data?.data.length - 6, data?.data.length - 1)
          .map((item, idx) => item?.product?.quantity || idx + 7)
      );
    }
  }, [productNames, productPurchased, productSold, data?.data]);

  const chartOptions = {
    chart: {
      type: "bar",
      stacked: true,
      height: 350,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        endingShape: "rounded",
      },
    },
    xaxis: {
      categories: productNames ? productNames : sampleProducts,
    },
    title: {
      text: "Top Products",
      align: "left",
    },
    legend: {
      position: "top",
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
      name: "January",
      data: productPurchased ? productPurchased : samplePurchased, // Add your data for January
    },
    {
      name: "February",
      data: productSold ? productSold : sampleSold, // Add your data for February
    },
    // Add more series for additional months
  ];

  return (
    <div className="w-3/4 ">
      <ReactApexChart
        options={chartOptions}
        series={chartSeries}
        type="bar"
        height={350}
      />
    </div>
  );
};

export default TopSellingProductsChart;
