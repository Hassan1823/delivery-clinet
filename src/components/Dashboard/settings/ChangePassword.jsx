import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import { useAuthContext } from '../../../context/AuthContext';

// create a schema of object with validation rules

const schema = yup.object().shape({
	oldPassword: yup.string().required('Current Password is required'),
	newPassword: yup
		.string()
		.required('New Password is required')
		.matches(
			/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]{8,}$/,
			'Password must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number, and be at least 8 characters long'
		),
	confirmPassword: yup
		.string()
		.oneOf([yup.ref('newPassword'), null], 'Passwords must match')
		.required('Confirm Password is required'),
});

export const ChangePassword = () => {
	// logoutHandler

	const { logoutHandler } = useAuthContext();
	// use the useForm hook to register the form inputs
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		resolver: yupResolver(schema),
	});

	// create a function to handle the form submission
	const onSubmit = async (data) => {
		// console.log(data);
		try {
			const response = await fetch('/api/auth/change-password', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});

			const responseData = await response.json();

			if (response.ok) {
				console.log('Password changed successfully:', responseData);
				toast.success('Password changed successfully');
				reset();
				logoutHandler();
			} else {
				console.log('Password change failed:', responseData);
				toast.error(responseData.message);
			}
		} catch (error) {
			console.error('Password change failed:', error);
			toast.error('Password change failed');
		}
	};
	return (
		<>
			<div>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div className='text-2xl'>Change Password</div>
					<div className='flex flex-col gap-4'>
						<div>
							<label htmlFor='oldPassword'>Current Password</label>
							<input
								type='password'
								name='oldPassword'
								id='oldPassword'
								className='border-2 rounded-lg p-2 w-full'
								{...register('oldPassword')}
							/>
							{errors.oldPassword && (
								<p className='text-red-500'>{errors.oldPassword.message}</p>
							)}
						</div>
						<div>
							<label htmlFor='newPassword'>New Password</label>
							<input
								type='password'
								name='newPassword'
								id='newPassword'
								className='border-2 rounded-lg p-2 w-full'
								{...register('newPassword')}
							/>
							{errors.newPassword && (
								<p className='text-red-500'>{errors.newPassword.message}</p>
							)}
						</div>
						<div>
							<label htmlFor='confirmPassword'>Confirm Password</label>
							<input
								type='password'
								name='confirmPassword'
								id='confirmPassword'
								className='border-2 rounded-lg p-2 w-full'
								{...register('confirmPassword')}
							/>
							{errors.confirmPassword && (
								<p className='text-red-500'>{errors.confirmPassword.message}</p>
							)}
						</div>
						<div>
							<button
								className='bg-yellow-600 text-white p-2 rounded-lg w-full'
								type='submit'
							>
								Change Password
							</button>
						</div>
					</div>
				</form>
			</div>
		</>
	);
};
