import React from 'react';
import { NavBar } from '../Navbar/NavBar';
import { Footer } from '../Footer/Footer';
import { useParams } from 'react-router-dom';

export const DetailOrder = () => {
	const { orderid } = useParams();

	return (
		<>
			<NavBar />
			<>
				<div className='min-h-screen bg-[#E5E5E5]'>
					<div className='flex justify-center text-5xl font-bold text-[#282828]'>
						Tracking ID # {orderid}
					</div>
					<ul className='timeline timeline-vertical mt-10'>
						<li>
							<div className='timeline-start timeline-box'>Created At</div>
							<div className='timeline-middle'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 20 20'
									fill='currentColor'
									className='w-5 h-5 text-primary'
								>
									<path
										fillRule='evenodd'
										d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z'
										clipRule='evenodd'
									/>
								</svg>
							</div>
							<hr className='bg-primary' />
						</li>
						<li>
							<hr className='bg-primary' />
							<div className='timeline-middle'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 20 20'
									fill='currentColor'
									className='w-5 h-5 text-primary'
								>
									<path
										fillRule='evenodd'
										d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z'
										clipRule='evenodd'
									/>
								</svg>
							</div>
							<div className='timeline-end timeline-box'>
								Waiting for dispatch
							</div>
							<hr className='bg-primary' />
						</li>
						<li>
							<hr className='bg-primary' />
							<div className='timeline-start timeline-box'>on way</div>
							<div className='timeline-middle'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 20 20'
									fill='currentColor'
									className='w-5 h-5 text-primary'
								>
									<path
										fillRule='evenodd'
										d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z'
										clipRule='evenodd'
									/>
								</svg>
							</div>
							<hr />
						</li>
						<li>
							<hr />
							<div className='timeline-middle'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 20 20'
									fill='currentColor'
									className='w-5 h-5'
								>
									<path
										fillRule='evenodd'
										d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z'
										clipRule='evenodd'
									/>
								</svg>
							</div>
							<div className='timeline-end timeline-box'>
								Delivered to your city{' '}
							</div>
							<hr />
						</li>
						<li>
							<hr />
							<div className='timeline-start timeline-box'>delevered</div>
							<div className='timeline-middle'>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									viewBox='0 0 20 20'
									fill='currentColor'
									className='w-5 h-5'
								>
									<path
										fillRule='evenodd'
										d='M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z'
										clipRule='evenodd'
									/>
								</svg>
							</div>
						</li>
					</ul>
					<div class='  flex flex-col justify-center items-center mt-20'>
						<div class='bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg shadow-lg p-8'>
							{/* write content about tracking shippmemt   */}
							<p class='text-lg text-white mb-8'>
								Your order is on the way to you and will be delivered soon
							</p>
						</div>
					</div>
				</div>
			</>
			<Footer />
		</>
	);
};
