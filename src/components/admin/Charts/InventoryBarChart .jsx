import React from 'react';
import Chart from 'react-apexcharts';

const InventoryBarChart = () => {
	// Dummy data for inventory products
	const inventoryData = [
		{ product: 'Product A', quantity: 50 },
		{ product: 'Product B', quantity: 30 },
		{ product: 'Product C', quantity: 70 },
		{ product: 'Product D', quantity: 40 },
		// Add more products as needed
	];

	// Extract product names and quantities for the chart
	const productNames = inventoryData.map((item) => item.product);
	const quantities = inventoryData.map((item) => item.quantity);

	// ApexCharts configuration
	const chartOptions = {
		chart: {
			id: 'inventory-bar-chart',
			toolbar: {
				show: false,
			},
		},
		xaxis: {
			categories: productNames,
		},
		title: {
			text: 'Inventory Products',
			align: 'left',
		},
	};

	const chartSeries = [
		{
			name: 'Quantity',
			data: quantities,
		},
	];

	return (
		<div className='inventory-bar-chart w-3/4'>
			<Chart
				options={chartOptions}
				series={chartSeries}
				type='bar'
				height={400}
			/>
		</div>
	);
};

export default InventoryBarChart;
