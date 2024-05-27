import React from "react";
import Chart from "react-apexcharts";

const InventoryBarChart = (data) => {
  // Dummy data for inventory products
  const inventoryData = [
    { name: "Product A", quantity: 50 },
    { name: "Product B", quantity: 30 },
    { name: "Product C", quantity: 70 },
    { name: "Product D", quantity: 40 },
    // Add more products as needed
  ];

  // Extract product names and quantities for the chart
  const productNames = data?.data.slice(0, 4).map((item) => item.name);
  const quantities = data?.data.slice(0, 4).map((item) => item.quantity);

  // ApexCharts configuration
  const chartOptions = {
    chart: {
      id: "inventory-bar-chart",
      toolbar: {
        show: false,
      },
    },
    xaxis: {
      categories: productNames,
    },
    title: {
      text: "Inventory Products",
      align: "left",
    },
  };

  const chartSeries = [
    {
      name: "Quantity",
      data: quantities,
    },
  ];

  return (
    <div className="w-3/4 inventory-bar-chart">
      <Chart
        options={chartOptions}
        series={chartSeries}
        type="bar"
        height={400}
      />
    </div>
  );
};

export default InventoryBarChart;
