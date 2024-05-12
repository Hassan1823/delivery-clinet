import React from 'react';

export const UpdateProfile = () => {
	return (
		<>
			<div>
				<form action=''>
					<div className='flex flex-col gap-5'>
						<div className='flex flex-col gap-2'>
							<label
								htmlFor='name'
								className='text-lg'
							>
								Full Name
							</label>
							<input
								type='text'
								name='name'
								id='name'
								className='p-2 rounded-lg border border-gray-300'
							/>
						</div>
						<div className='flex flex-col gap-2'>
							<label
								htmlFor='username'
								className='text-lg'
							>
								username
							</label>
							<input
								type='text'
								name='username'
								id='username'
								className='p-2 rounded-lg border border-gray-300'
							/>
						</div>
						<div className='flex flex-col gap-2'>
							<label
								htmlFor='email'
								className='text-lg'
							>
								Email
							</label>
							<input
								type='email'
								name='email'
								id='email'
								className='p-2 rounded-lg border border-gray-300'
							/>
						</div>

						{/* gender  */}
						<div className='flex flex-col gap-2'>
							<div className='form-control w-fit'>
								<label
									htmlFor='gender'
									className='text-lg'
								>
									Gender
								</label>

								<label className='label cursor-pointer '>
									<span className='label-text'>Male</span>
									<input
										type='radio'
										name='gender'
										value='male'
										className='radio checked:bg-red-500'
									/>
								</label>
								<label className='label cursor-pointer'>
									<span className='label-text'>Female</span>
									<input
										type='radio'
										name='gender'
										value='female'
										className='radio checked:bg-red-500'
									/>
								</label>
							</div>
						</div>
						<button className='p-2 bg-yellow-600 text-white rounded-lg'>
							Update Profile
						</button>
					</div>
				</form>
			</div>
		</>
	);
};
