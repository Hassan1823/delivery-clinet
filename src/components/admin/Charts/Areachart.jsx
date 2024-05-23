import React from 'react';
import ReactApexChart from 'react-apexcharts';

const InventoryLevelChart = () => {
	const chartOptions = {
		chart: {
			type: 'area',
			height: 350,
			toolbar: {
				show: false,
			},
		},
		xaxis: {
			type: 'datetime',
			categories: [
				'2024-02-01T00:00:00.000Z',
				'2024-02-02T00:00:00.000Z',
				'2024-02-03T00:00:00.000Z',
				'2024-02-04T00:00:00.000Z',
				'2024-02-05T00:00:00.000Z',
				// Add more dates as needed
			],
		},
		title: {
			text: 'Inventory Level',
			align: 'left',
		},
		grid: {
			row: {
				colors: ['#f3f3f3', 'transparent'], // Alternating row colors
				opacity: 0.5,
			},
		},
	};

	const chartSeries = [
		{
			name: 'Inventory Level',
			data: [100, 120, 80, 150, 110], // Add your inventory level data
		},
	];

	return (
		<div className=' w-3/4'>
			<ReactApexChart
				options={chartOptions}
				series={chartSeries}
				type='area'
			/>
		</div>
	);
};

export default InventoryLevelChart;
