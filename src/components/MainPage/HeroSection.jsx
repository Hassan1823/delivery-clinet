import React from 'react';
import delivery from './delivery.png';
import Balb from './balb.png';
import './HeroSection.css';

export const HeroSection = () => {
	return (
		<div className='hero min-h-screen bg-[#E5E5E5] landing-page'>
			<div className='hero-content flex-col lg:flex-row-reverse'>
				<div className='ml-[100px]'>
					<img
						src={delivery}
						alt=''
					/>
				</div>
				<div className='max-w-lg mr-[100px]'>
					<p className='text-[#DF6951] text-lg '>
						Empower your online business with Delivery Hero
					</p>
					<h1 className='text-5xl font-bold text-[#282828] py-2'>
						Elevate Your Business with Delivery Hero
					</h1>

					<p className='py-6 text-[#282828]'>
						Deliver success with Delivery Hero: Your all-in-one solution for
						easy order management, real-time inventory tracking, and seamless
						shipping label generation. Simplify your online business on social
						media
					</p>

					<button className=' text-white bg-yellow-600 font-bold py-2 px-4 shadow-2xl'>
						Find out more
					</button>
				</div>
			</div>
		</div>
	);
};
