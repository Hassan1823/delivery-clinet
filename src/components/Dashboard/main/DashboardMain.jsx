import React from 'react';
import { Top } from './Top.jsx';
import InventoryBarChart from '../Charts/InventoryBarChart .jsx';
import InventoryLevelChart from '../Charts/Areachart.jsx';
import Barchart from '../Charts/Barchart.jsx';
import SalesOverviewChart from '../Charts/Linechart.jsx';
import TopSellingProductsChart from '../Charts/StackedBarchart.jsx';
import { FloatButton } from 'antd';

export const DashboardMain = () => {
	return (
		<>
			<div className=' py-10 px-20 min-h-screen text-black flex-col flex gap-10'>
				<Top />
				<div className='flex flex-col gap-10'>
					<InventoryBarChart />
					<InventoryLevelChart />
					<Barchart />
					<SalesOverviewChart />
					<TopSellingProductsChart />
				</div>
				<FloatButton.BackTop />
			</div>
		</>
	);
};
