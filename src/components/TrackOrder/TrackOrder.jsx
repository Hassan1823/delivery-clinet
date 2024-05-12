import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const TrackOrder = () => {
	const [value, setvalue] = useState('');
	const naigate = useNavigate();

	const handleChange = (e) => {
		setvalue(e.target.value);
	};

	const handleSubmit = () => {
		naigate(`/orders/${value}`);

		setvalue('');
	};
	return (
		<>
			<div className='bg-[#E5E5E5]'>
				<section class='pt-12 lg:pt-24 min-h-screen '>
					<div class='bg-yellow-600 text-white -skew-y-1'>
						<div class='container mx-auto skew-y-1'>
							<div class='flex flex-col items-center py-10 text-center lg:py-20'>
								<div class='w-full px-4 lg:w-1/2 lg:px-0'>
									<div class='mb-8'>
										<h2 class='text-3xl lg:text-4xl font-bold mb-3'>
											Looking for Your Order?
										</h2>
										<p class='text-lg lg:text-xl opacity-80'>
											Track your order here
										</p>
									</div>
									<div class='mb-10'>
										<div class='relative'>
											<form
												onSubmit={(e) => {
													e.preventDefault();
													handleSubmit();
												}}
											>
												<input
													type='search'
													name='search'
													placeholder='Search here for threads'
													class='p-4 pl-10 text-gray-600 rounded w-full border-gray-100'
													value={value}
													onChange={handleChange}
												/>

												<button
													className='mt-10 btn bg-white text-black'
													type='submit'
												>
													search
												</button>
											</form>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
			</div>
		</>
	);
};
