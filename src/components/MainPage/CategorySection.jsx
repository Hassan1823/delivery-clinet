import React from 'react';
import img1 from './img1.png';
import img2 from './img2.png';
import img3 from './img3.png';

export const CategorySection = () => {
	return (
		<>
			<div className='flex flex-col gap-10 bg-[#E5E5E5] min-h-lvh'>
				<div className='flex justify-center text-[#5E6282]'>CATEGORY</div>
				<div className='flex justify-center text-4xl text-[#14183E] font-extrabold'>
					We Offer Best Services
				</div>
				<div className='flex justify-evenly items-center mx-40 text-black'>
					<div className='flex flex-col items-center justify-between gap-2'>
						<img
							src={img1}
							alt=''
						/>
						<h1 className='text-lg'>Streamlined Order Management</h1>

						<p className=' w-2/4'>
							Simplify your business with Delivery Hero's streamlined order
							management
						</p>
					</div>
					<div className='flex flex-col items-center justify-between gap-2'>
						<img
							src={img2}
							alt=''
						/>
						<h1 className='text-lg'>Real-Time Inventory Tracking</h1>
						<p className=' w-2/4'>
							Stay in control with Delivery Hero's real-time inventory tracking.
						</p>
					</div>
					<div className='flex flex-col items-center justify-between gap-2'>
						<img
							src={img3}
							alt=''
						/>
						<h1 className='text-lg'>Effortless Shipping Label Generation</h1>
						<p className=' w-2/4'>
							Simplify shipping labels effortlessly with Delivery Hero.
						</p>
					</div>
				</div>
			</div>
		</>
	);
};
