import React, { useState } from 'react';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast from 'react-hot-toast';

const schema = yup.object().shape({
	name: yup.string().required('Product Name is required'),
	price: yup.string().required('Price is required'),

	category: yup.string().required('Category is required'),
	quantity: yup.string().required('Quantity is required'),
	weight: yup.string().required('Weight is required'),
});
export const AddProduct = ({ refresh }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const openModal = () => {
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
	};
	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm({
		resolver: yupResolver(schema),
	});
	const onSubmit = async (data) => {
		const { price, quantity, weight } = data;

		// they must not be negetive
		if (price < 0 || quantity < 0 || weight < 0) {
			toast.error('Price, Quantity and Weight must be positive');
			return;
		}
		try {
			const response = await fetch(`/api/product/createproduct`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			});
			if (response.ok) {
				console.log('Product added successful');
				const product = await response.json();
				console.log('Product:', product);
				toast.success('Product added successful');
				refresh();

				reset();
				closeModal();
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
				onClick={() => {
					document.getElementById('addproduct').showModal();
					openModal();
				}}
			>
				<IoMdAddCircleOutline className='text-2xl text-white' />
				Add Product
			</button>

			{/* Modal */}

			<dialog
				id='addproduct'
				className='modal'
			>
				<div className='modal-box w-11/12 max-w-5xl bg-[#E5E5E5]'>
					<h3 className='font-bold text-lg'>Add product Form</h3>

					<form
						className='flex flex-col'
						onSubmit={handleSubmit(onSubmit)}
						encType='multipart/form-data'
					>
						{/* Product Name */}
						<div className='my-4 flex mx-20 gap-10 justify-between'>
							<label
								htmlFor='name'
								className='block text-sm font-bold mb-2'
							>
								Product Name :
							</label>
							<div className='flex flex-col w-3/4'>
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
									<p className='text-red-500'>{errors.name.message}</p>
								)}
							</div>
						</div>

						{/* Product Price */}
						<div className='my-4 flex mx-20 gap-10 justify-between'>
							<label
								htmlFor='price'
								className='block text-sm font-bold mb-2'
							>
								Price :
							</label>
							<div className='flex flex-col w-3/4'>
								<input
									type='number'
									id='price'
									name='price'
									className={`border-2 rounded-lg py-2 px-3  bg-white w-3/4 ${
										errors.price ? 'input-error' : ''
									}`}
									{...register('price')}
								/>
								{errors.price && (
									<p className='text-red-500'>{errors.price.message}</p>
								)}
							</div>
						</div>

						{/* Product Category */}
						<div className='my-4 flex mx-20 gap-10 justify-between'>
							<label
								htmlFor='category'
								className='block text-sm font-bold mb-2'
							>
								Category :
							</label>
							<div className='flex flex-col w-3/4'>
								<input
									type='text'
									id='category'
									name='category'
									className={`border-2 rounded-lg py-2 px-3 w-3/4  bg-white  ${
										errors.category ? 'input-error' : ''
									}`}
									{...register('category')}
								/>
								{errors.category && (
									<p className='text-red-500'>{errors.category.message}</p>
								)}
							</div>
						</div>

						{/* Product Quantity */}
						<div className='my-4 flex mx-20 gap-10 justify-between'>
							<label
								htmlFor='quantity'
								className='block text-sm font-bold mb-2'
							>
								Quantity :
							</label>
							<div className='flex flex-col w-3/4'>
								<input
									type='number'
									id='quantity'
									name='quantity'
									className={`border-2 rounded-lg py-2 px-3  bg-white w-3/4 ${
										errors.quantity ? 'input-error' : ''
									}`}
									{...register('quantity')}
								/>
								{errors.quantity && (
									<p className='text-red-500'>{errors.quantity.message}</p>
								)}
							</div>
						</div>

						{/* Product Weight */}
						<div className='my-4 flex mx-20 gap-10 justify-between'>
							<label
								htmlFor='weight'
								className='block text-sm font-bold mb-2'
							>
								Weight (in grams) :
							</label>
							<div className='flex flex-col w-3/4'>
								<input
									type='number'
									id='weight'
									name='weight'
									className={`border-2 rounded-lg py-2 px-3  bg-white w-3/4 ${
										errors.weight ? 'input-error' : ''
									}`}
									{...register('weight')}
								/>
								{errors.weight && (
									<p className='text-red-500'>{errors.weight.message}</p>
								)}
							</div>
						</div>

						{/* Submit Button */}
						<div className='flex justify-center'>
							<button
								type='submit'
								className='text-white bg-yellow-600 font-bold py-2 px-4 rounded-xl shadow-2xl flex gap-1'
								onClick={() => {
									document.getElementById('addproduct').hidden = true;
								}}
							>
								Add Product
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
