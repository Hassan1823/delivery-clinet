import React from 'react';
import ReactApexChart from 'react-apexcharts';

const TopSellingProductsChart = () => {
	const chartOptions = {
		chart: {
			type: 'bar',
			stacked: true,
			height: 350,
			toolbar: {
				show: false,
			},
		},
		plotOptions: {
			bar: {
				horizontal: false,
				endingShape: 'rounded',
			},
		},
		xaxis: {
			categories: [
				'Product A',
				'Product B',
				'Product C',
				'Product D',
				'Product E',
			],
		},
		title: {
			text: 'Top Products',
			align: 'left',
		},
		legend: {
			position: 'top',
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
			name: 'January',
			data: [30, 40, 45, 50, 60], // Add your data for January
		},
		{
			name: 'February',
			data: [25, 35, 40, 45, 55], // Add your data for February
		},
		// Add more series for additional months
	];

	return (
		<div className=' w-3/4'>
			<ReactApexChart
				options={chartOptions}
				series={chartSeries}
				type='bar'
				height={350}
			/>
		</div>
	);
};

export default TopSellingProductsChart;
