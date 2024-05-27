import React, { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";

const Barchart = (data) => {
  const [productNames, setProductNames] = useState([]);
  const [productPurchased, setProductPurchased] = useState([]);
  const [productSold, setProductSold] = useState([]);
  const sampleProducts = ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"];
  const samplePurchased = [10, 15, 7, 22, 12];
  const sampleSold = [5, 10, 15, 8, 18];

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

  //   console.log("productSold :::", productSold);
  const chartOptions = {
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories:
        productNames && productNames.length !== 0
          ? productNames
          : sampleProducts,
    },
    yaxis: {
      title: {
        text: "Quantity",
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return val;
        },
      },
    },
  };

  const chartSeries = [
    {
      name: "Sold Items",
      data:
        productPurchased && productPurchased.length !== 0
          ? productPurchased
          : samplePurchased,
    },
    {
      name: "Purchased Items",
      data: productSold && productSold.length !== 0 ? productSold : sampleSold,
    },
  ];

  return (
    <div className="w-3/4 ">
      <ReactApexChart options={chartOptions} series={chartSeries} type="bar" />
    </div>
  );
};

export default Barchart;
