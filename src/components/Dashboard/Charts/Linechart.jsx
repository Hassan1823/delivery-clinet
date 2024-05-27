import React from "react";
import ReactApexChart from "react-apexcharts";

const SalesOverviewChart = (data) => {
  // Assuming today's date
  const today = new Date();

  // Function to get the date string in YYYY-MM-DD format
  const formatDate = (date) => {
    const d = new Date(date);
    let month = "" + (d.getMonth() + 1);
    let day = "" + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };

  // Get the date strings for the last four days
  const lastFourDays = [];
  for (let i = 0; i < 4; i++) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);
    lastFourDays.unshift(formatDate(date));
  }

  // Group data by createdAt and sum the quantity for each group
  const groupedData = data?.data.reduce((acc, item) => {
    const key = formatDate(new Date(item.createdAt));
    if (!acc[key]) {
      acc[key] = { ...item, quantity: 0 }; // Copy other properties except quantity
    }
    acc[key].quantity += item.quantity;
    return acc;
  }, {});

  // Select the last four groups based on the current date
  const selectedGroups = Object.values(groupedData).filter((item) =>
    lastFourDays.includes(formatDate(new Date(item.createdAt)))
  );

  // Extract the summed quantities for the last four days
  const quantitiesLastFourDays = selectedGroups.map((group) => group.quantity);

  // Ensure the result has exactly four elements, padding with zeros if necessary
  const finalQuantities = [...Array(4).keys()].map((_, index) => {
    // Directly access the quantity or return 0 if there's no data for that day
    return quantitiesLastFourDays[index] ?? 0;
  });

  //   console.log(finalQuantities);

  const sampleData = [300, 450, 600, 350, 700];

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

  //     [
  //         "2024-02-01T00:00:00.000Z",
  //         "2024-02-02T00:00:00.000Z",
  //         "2024-02-03T00:00:00.000Z",
  //         "2024-02-04T00:00:00.000Z",
  //         "2024-02-05T00:00:00.000Z",
  //         // Add more dates as needed
  //       ],
  const chartOptions = {
    chart: {
      type: "line",
      height: 350,
      toolbar: {
        show: false,
      },
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      type: "datetime",
      categories: sampleDates,
    },
    title: {
      text: "Orders Overview",
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
      name: "Sales",
      data: finalQuantities ? finalQuantities : sampleData, // Add your daily sales data
    },
  ];

  return (
    <div className="w-3/4 ">
      <ReactApexChart
        options={chartOptions}
        series={chartSeries}
        type="line"
        height={350}
      />
    </div>
  );
};

export default SalesOverviewChart;
