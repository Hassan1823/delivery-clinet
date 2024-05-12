import React from 'react';
import ReactApexChart from 'react-apexcharts';

const Barchart = () => {
	const chartOptions = {
		chart: {
			type: 'bar',
			height: 350,
		},
		plotOptions: {
			bar: {
				horizontal: false,
				columnWidth: '55%',
				endingShape: 'rounded',
			},
		},
		dataLabels: {
			enabled: false,
		},
		stroke: {
			show: true,
			width: 2,
			colors: ['transparent'],
		},
		xaxis: {
			categories: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'],
		},
		yaxis: {
			title: {
				text: 'Quantity',
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
			name: 'Purchased Items',
			data: [10, 15, 7, 22, 12],
		},
		{
			name: 'Sold Items',
			data: [5, 10, 15, 8, 18],
		},
	];

	return (
		<div className=' w-3/4'>
			<ReactApexChart
				options={chartOptions}
				series={chartSeries}
				type='bar'
			/>
		</div>
	);
};

export default Barchart;
