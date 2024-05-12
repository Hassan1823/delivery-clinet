import React from 'react';
import { motion } from 'framer-motion';

export const Top = () => {
	return (
		<div>
			<div className='flex justify-evenly items-center'>
				<motion.div
					className='w-1/4 flex flex-col justify-center items-center bg-blue-200 p-5 rounded-xl gap-5 transition-transform transform hover:rotate-[-5deg] hover:rotate[-5deg] cursor-pointer shadow-xl'
					// initial={{ x: '-100vw' }}
					// animate={{
					// 	x: 0,
					// 	type: 'spring',
					// 	stiffness: 1000,
					// 	damping: 10,
					// 	duration: 2,
					// }}
					whileHover={{ rotate: -6 }}
					// transition={{ ease: 'easein', duration: 2 }}
				>
					<div className='w-full flex justify-between items-center'>
						<h1 className='text-md text-black font-semibold'>Facebook</h1>
						<h1 className=' text-green-600 font-semibold'>+2.75%</h1>
					</div>
					<div className='w-full flex justify-between items-center'>
						<div className='flex flex-col justify-center items-start gap-1'>
							<h1 className='text-3xl text-black font-semibold '>
								10
								<p className='text-slate-700'>Customers</p>
							</h1>
						</div>
					</div>
				</motion.div>
				<motion.div
					className='w-1/4 flex flex-col justify-center items-center bg-[#F56040] p-5 rounded-xl gap-5 transition-transform transform  cursor-pointer shadow-2xl'
					whileHover={{ scale: 1.25 }}
					// initial={{ y: '-100vw' }}
					animate={{ y: 0 }}
					// transition={{ type: 'bounce', stiffness: 100, damping: 10 }}
				>
					<div className='w-full flex justify-between items-center'>
						<h1 className='text-md text-black font-semibold'>Instagram</h1>
						<h1 className=' text-green-600 font-semibold'>+21%</h1>
					</div>
					<div className='w-full flex justify-between items-center'>
						<div className='flex flex-col justify-center items-start gap-1'>
							<h1 className='text-3xl text-black font-semibold '>
								10,328
								<p className='text-slate-700'>Customers</p>
							</h1>
						</div>
					</div>
				</motion.div>
				<motion.div
					className='w-1/4 flex flex-col justify-center items-center bg-[#dcf8c6] p-5 rounded-xl gap-5 transition-transform transform hover:rotate-[-5deg] hover:rotate[-5deg] cursor-pointer shadow-xl'
					// initial={{ x: '100vw' }}
					animate={{ x: 0 }}
					whileHover={{ rotate: 6 }}
				>
					<div className='w-full flex justify-between items-center'>
						<h1 className='text-md text-black font-semibold'>whatsapp</h1>
						<h1 className=' text-green-600 font-semibold'>+0.75%</h1>
					</div>
					<div className='w-full flex justify-between items-center'>
						<div className='flex flex-col justify-center items-start gap-1'>
							<h1 className='text-3xl text-black font-semibold '>
								328
								<p className='text-slate-700'>Customers</p>
							</h1>
						</div>
					</div>
				</motion.div>
			</div>
		</div>
	);
};
