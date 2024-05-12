import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast from 'react-hot-toast';

const schema = yup.object().shape({
	fullName: yup.string().required('Full Name is required'),
	username: yup.string().required('Username is required'),
	email: yup
		.string()
		.email('Invalid email address')
		.required('Email is required'),
	password: yup
		.string()
		.required('Password is required')
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{8,}$/,
			'Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number, and be at least 8 characters long'
		),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref('password'), null], 'Passwords must match')
		.required('Confirm Password is required'),
	gender: yup.string().required('check anyone'),
});

export const SignUp = () => {
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		resolver: yupResolver(schema),
	});

	const onSubmit = async (data) => {
		try {
			const response = await fetch('/api/auth/signup', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});
	console.log(response)
			const responseData = await response.json();
	
			if (!response.ok) {
				// Log the error response for debugging
				console.error('Signup error response:', responseData);
	
				// Display a more specific error message if the server provides it
				const errorMessage = responseData.message || `Server error: ${response.status}`;
				throw new Error(errorMessage);
			}
	
			console.log('Signup successful:', responseData);
			
			navigate('/confirmotp');
			toast.success('Signup successful');
			reset();
		} catch (error) {
			console.error('Error during signup:', error.message);
			toast.error(`Error during signup: ${error.message}`);
		}
	};
	return (
		<>
			<div className='hero min-h-screen bg-[#E5E5E5]'>
				<div className='hero-content flex-col lg:flex-row-reverse'>
					<div className='card shrink-0 w-96  shadow-2xl bg-base-100'>
						<div className='flex justify-center items-center text-2xl pt-2 font-bold gradient-text'>
							Sign up
						</div>
						<form
							className='card-body'
							onSubmit={handleSubmit(onSubmit)}
						>
							{/* Full Name */}
							<div className='form-control'>
								<label className='label'>
									<span className='label-text'>Full name:</span>
								</label>
								<input
									type='text'
									placeholder='Full Name'
									className={`input input-bordered ${
										errors.fullName ? 'input-error' : ''
									}`}
									{...register('fullName')}
								/>
								{errors.fullName && (
									<p className='text-error'>{errors.fullName.message}</p>
								)}
							</div>

							{/* Username */}
							<div className='form-control'>
								<label className='label'>
									<span className='label-text'>Username:</span>
								</label>
								<input
									type='text'
									placeholder='Username'
									className={`input input-bordered ${
										errors.username ? 'input-error' : ''
									}`}
									{...register('username')}
								/>
								{errors.username && (
									<p className='text-error'>{errors.username.message}</p>
								)}
							</div>

							{/* Email */}
							<div className='form-control'>
								<label className='label'>
									<span className='label-text'>Email:</span>
								</label>
								<input
									type='email'
									placeholder='Email'
									className={`input input-bordered ${
										errors.email ? 'input-error' : ''
									}`}
									{...register('email')}
								/>
								{errors.email && (
									<p className='text-error'>{errors.email.message}</p>
								)}
							</div>

							{/* Password */}
							<div className='form-control'>
								<label className='label'>
									<span className='label-text'>Password:</span>
								</label>
								<input
									type='password'
									placeholder='Password'
									className={`input input-bordered ${
										errors.password ? 'input-error' : ''
									}`}
									{...register('password')}
								/>
								{errors.password && (
									<p className='text-error'>{errors.password.message}</p>
								)}
							</div>

							{/* Confirm Password */}
							<div className='form-control'>
								<label className='label'>
									<span className='label-text'>Confirm password</span>
								</label>
								<input
									type='password'
									placeholder='Confirm Password'
									className={`input input-bordered ${
										errors.confirmPassword ? 'input-error' : ''
									}`}
									{...register('confirmPassword')}
								/>
								{errors.confirmPassword && (
									<p className='text-error'>{errors.confirmPassword.message}</p>
								)}
							</div>

							{/* Gender */}
							<div className='form-control w-fit'>
								<label className='label cursor-pointer '>
									<span className='label-text'>Male</span>
									<input
										type='radio'
										name='gender'
										value='male'
										className='radio checked:bg-red-500'
										{...register('gender')}
									/>
									{errors.gender && (
										<p className='text-error'>{errors.gender.message}</p>
									)}
								</label>
								<label className='label cursor-pointer'>
									<span className='label-text'>Female</span>
									<input
										type='radio'
										name='gender'
										value='female'
										className='radio checked:bg-red-500'
										{...register('gender')}
									/>
									{errors.gender && (
										<p className='text-error'>{errors.gender.message}</p>
									)}
								</label>
							</div>

							{/* Already have an account? Login */}
							<label className='label'>
								<Link
									to='/login'
									className='label-text-alt link link-hover'
								>
									Already have an account? Login
								</Link>
							</label>

							{/* Submit Button */}
							<div className='form-control mt-6'>
								<button
									type='submit'
									className='btn btn-primary'
								>
									Sign up
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
};
