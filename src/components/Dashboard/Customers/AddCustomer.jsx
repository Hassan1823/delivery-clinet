import React from 'react';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast from 'react-hot-toast';

const schema = yup.object().shape({
	name: yup.string().required('Name is required'),
	email: yup.string().required('Email is required'),
	phone: yup.string().required('Phone is required'),
	address: yup.string().required('Address is required'),
	salesChannel: yup.string().required('City is required'),
	socialUsername: yup.string().required('State is required'),
});
export const AddCustomer = ({ refresh }) => {
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
			const response = await fetch(`/api/customer/createcustomer`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});
			if (response.ok) {
				console.log('customer added successful');
				const customer = await response.json();
				console.log('customer:', customer);
				toast.success('customer added successful');
				refresh();
				reset();
			} else {
				console.error('failed failed');
				toast.error('Addition failed');
			}
			// Reset the form after successful submission (optional)
		} catch (error) {
			console.error('Error during product addition:', error);
		}
	};
	return (
		<>
			<button
				className='text-white bg-yellow-600 font-bold py-2 px-4 rounded-xl shadow-2xl flex gap-1'
				onClick={() => document.getElementById('addcustomer').showModal()}
			>
				<IoMdAddCircleOutline className='text-2xl text-white' />
				Add Customer
			</button>
			<dialog
				id='addcustomer'
				className='modal'
			>
				<div className='modal-box w-11/12 max-w-5xl bg-[#E5E5E5]'>
					<h3 className='font-bold text-lg'>Add Customer Form</h3>

					<form
						className='flex flex-col'
						onSubmit={handleSubmit(onSubmit)}
					>
						{/* customer name */}
						<div className='my-4 flex mx-20 gap-10 justify-between'>
							<label
								htmlFor='name'
								className='block text-sm font-bold mb-2'
							>
								Customer Name :
							</label>
							<div className='flex-flex-col w-3/4'>
								<input
									type='text'
									id='name'
									name='name'
									className={`border-2 rounded-lg py-2 px-3  bg-white w-3/4 ${
										errors.name ? 'input-error' : ''
									}`}
									{...register('name')}
								/>
								{errors.name && (
									<p className='text-red-500 text-sm'>{errors.name.message}</p>
								)}
							</div>
						</div>
						{/* customer email */}
						<div className='my-4 flex mx-20 gap-10 justify-between'>
							<label
								htmlFor='email'
								className='block text-sm font-bold mb-2'
							>
								Email :
							</label>
							<div className='flex-flex-col w-3/4'>
								<input
									type='email'
									id='email'
									name='email'
									className={`border-2 rounded-lg py-2 px-3  bg-white w-3/4 ${
										errors.email ? 'input-error' : ''
									}`}
									{...register('email')}
								/>
								{errors.email && (
									<p className='text-red-500 text-sm'>{errors.email.message}</p>
								)}
							</div>
						</div>
						{/* customer Phone */}
						<div className='my-4 flex mx-20 gap-10 justify-between'>
							<label
								htmlFor='phone'
								className='block text-sm font-bold mb-2'
							>
								Phone :
							</label>
							<div className='flex-flex-col w-3/4'>
								<input
									type='text'
									id='phone'
									name='phone'
									className={`border-2 rounded-lg py-2 px-3  bg-white w-3/4 ${
										errors.phone ? 'input-error' : ''
									}`}
									{...register('phone')}
								/>
								{errors.phone && (
									<p className='text-red-500 text-sm'>{errors.phone.message}</p>
								)}
							</div>
						</div>
						{/* Address text area Category */}
						<div className='my-4 flex mx-20 gap-10 justify-between'>
							<label
								htmlFor='address'
								className='block text-sm font-bold mb-2'
							>
								Address :
							</label>
							<div className='flex-flex-col w-3/4'>
								<textarea
									id='address'
									name='address'
									className={`border-2 rounded-lg py-2 px-3  bg-white w-3/4 ${
										errors.address ? 'input-error' : ''
									}`}
									{...register('address')}
								/>
								{errors.address && (
									<p className='text-red-500 text-sm'>
										{errors.address.message}
									</p>
								)}
							</div>
						</div>
						{/* sale channal select field   */}
						<div className='my-4 flex mx-20 gap-10 justify-between'>
							<label
								htmlFor='salesChannel'
								className='block text-sm font-bold mb-2'
							>
								Sales Channel :
							</label>
							<div className='flex-flex-col w-3/4'>
								{' '}
								<select
									id='salesChannel'
									name='salesChannel'
									className={`border-2 rounded-lg py-2 px-3  bg-white w-3/4 ${
										errors.salesChannel ? 'input-error' : ''
									}`}
									{...register('salesChannel')}
								>
									<option value='facebook'>Facebook</option>

									<option value='whatsapp'>Whatsapp</option>

									<option value='instagram'>Instagram</option>
									<option value='others'>Others</option>
								</select>
								{errors.salesChannel && (
									<p className='text-red-500 text-sm'>
										{errors.salesChannel.message}
									</p>
								)}
							</div>
						</div>
						{/* social media username */}
						<div className='my-4 flex mx-20 gap-10 justify-between'>
							<label
								htmlFor='socialUsername'
								className='block text-sm font-bold mb-2'
							>
								Social Username :
							</label>
							<div className='flex-flex-col w-3/4'>
								<input
									type='text'
									id='socialUsername'
									name='socialUsername'
									className={`border-2 rounded-lg py-2 px-3  bg-white w-3/4 ${
										errors.socialUsername ? 'input-error' : ''
									}`}
									{...register('socialUsername')}
								/>
								{errors.socialUsername && (
									<p className='text-red-500 text-sm'>
										{errors.socialUsername.message}
									</p>
								)}
							</div>
						</div>
						{/* Submit Button */}
						<div className='flex justify-center'>
							<button
								type='submit'
								className='text-white bg-yellow-600 font-bold py-2 px-4 rounded-xl shadow-2xl flex gap-1'
							>
								Add Custoomer
							</button>
						</div>
					</form>

					<div className='modal-action'>
						<form method='dialog'>
							{/* if there is a button, it will close the modal */}
							<button className='btn text-white bg-red-700 font-bold py-2 px-4 rounded-lg shadow-2xl'>
								Close
							</button>
						</form>
					</div>
				</div>
			</dialog>
		</>
	);
};
