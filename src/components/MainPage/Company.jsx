import React from 'react';
import SliderBrand from './Slider';

export const Company = () => {
	return (
		<>
			<div className='flex flex-col gap-10 bg-[#E5E5E5] min-h-lvh'>
				{/* <img
						src={brands}
						alt=''
					/> */}
				<SliderBrand />

				<div className='flex flex-col gap-2 text-4xl text-[#14183E] font-extrabold justify-center items-center'>
					<p>Delivery Hero by the </p>
					<p>Numbers</p>
				</div>
				<div className='flex  border-2 justify-evenly gap-10 border-gray-600 rounded-lg mx-60 p-10'>
					<div className='flex flex-col gap-5 items-center justify-center  rounded-lg'>
						<h1 className='text-[#04BBEE] text-7xl'> 30%</h1>
						<p className='text-black'>
							Top 100 Retailers who ship parcel trust Delivery Hero
						</p>
					</div>
					<div className='flex flex-col gap-5 '>
						<h1 className='text-[#04BBEE] text-7xl'>1.5+</h1>
						<p className='text-black'>Billion parcel shipments a year</p>
					</div>
					<div className='flex flex-col gap-5 '>
						<h1 className='text-[#04BBEE] text-7xl'> 8,000+</h1>
						<p className='text-black'>Shipping origins globally</p>
					</div>
					<div className='flex flex-col gap-5 '>
						<h1 className='text-[#04BBEE] text-7xl'> 845+</h1>
						<p className='text-black'>Billion in customer revenue supported</p>
					</div>
				</div>
			</div>
		</>
	);
};
