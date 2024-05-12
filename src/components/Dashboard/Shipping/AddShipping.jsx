import React, { useEffect, useState } from 'react';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import toast from 'react-hot-toast';
import DHL from './dhl.png';
import TCS from './tcs.png';
import Leopards from './leop.png';
// npm run dev
const schema = yup.object().shape({
	customerId: yup.string().required('Customer is required'),
	productId: yup.string().required('Product is required'),
	quantity: yup.string().required('Quantity is required'),
	shippingCost: yup.string().required('Shipping Cost is required'),
});

export const AddShipping = ({ refresh }) => {
	const [selectedImage, setSelectedImage] = useState(null);
	const [customers, setCustomers] = useState([]);
	const [products, setProducts] = useState([]);

	const fetchProducts = async () => {
		try {
			const response = await fetch(`/api/product/getproducts`);
			if (response.ok) {
				const products = await response.json();
				// console.log(products);
				setProducts(products);
			}
		} catch (error) {
			console.error('Error during product addition:', error);
		}
	};

	const fetchCustomers = async () => {
		try {
			const response = await fetch(`/api/customer/getcustomers`);
			if (response.ok) {
				const Customers = await response.json();
				// console.log(Customers);
				setCustomers(Customers);
			}
		} catch (error) {
			console.error('Error during customers addition:', error);
		}
	};

	const handleImageSelect = (brandName) => {
		setSelectedImage(brandName === selectedImage ? null : brandName);
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
		const { quantity, shippingCost } = data;

		// they must not be negetive
		if (quantity < 0 || shippingCost < 0) {
			toast.error('Quantity and Shipping Cost must be positive');
			return;
		}

		if (!selectedImage) {
			toast.error('Please select a brand');
			return;
		}
		console.log(data, selectedImage);

		try {
			const response = await fetch(`/api/shipping/create-shippment`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ ...data, brandName: selectedImage }),
			});
			if (response.ok) {
				console.log('Shipping added successful');
				const shipping = await response.json();
				console.log('Shipping:', shipping);
				toast.success('Shipping added successful');

				reset();
				refresh();
			} else {
				console.error('failed failed');

				toast.error('Addition failed');
			}

			reset();
			setSelectedImage(null);
		} catch (error) {
			console.error('Error during shipping addition:', error);
		}
	};

	useEffect(() => {
		Promise.all([fetchProducts(), fetchCustomers()]);
	}, []);
	return (
		<>
			<button
				className='text-white bg-yellow-600 font-bold py-2 px-4 rounded-xl shadow-2xl flex gap-1'
				onClick={() => document.getElementById('addshipping').showModal()}
			>
				<IoMdAddCircleOutline className='text-2xl text-white' />
				Add Shipping
			</button>
			<dialog
				id='addshipping'
				className='modal'
			>
				<div className='modal-box w-11/12 max-w-5xl bg-[#E5E5E5]'>
					<h3 className='font-bold text-lg'>Add Shipping Form</h3>

					<form
						className='flex flex-col'
						encType='multipart/form-data'
						onSubmit={handleSubmit(onSubmit)}
					>
						<div className='my-4 flex mx-20 gap-10 justify-between'>
							<label
								htmlFor='name'
								className='block text-sm font-bold mb-2'
							>
								Customer :
							</label>

							{/* select customer   */}
							<div className={`flex flex-col  w-3/4 `}>
								<select
									id='customer'
									name='customer'
									className={`border-2 rounded-lg py-2 px-3  bg-white w-3/4 `}
									{...register('customerId')}
								>
									<option value=''>Select Customer</option>
									{customers.map((customer) => (
										<option
											key={customer._id}
											value={customer._id}
										>
											{customer.name}
										</option>
									))}
								</select>

								{errors.customerId && (
									<p className='text-red-500 text-xs'>
										{errors?.customerId?.message}
									</p>
								)}
							</div>
						</div>

						<div className='my-4 flex mx-20 gap-10 justify-between'>
							<label
								htmlFor='email'
								className='block text-sm font-bold mb-2'
							>
								Product :
							</label>

							{/* select product  */}
							<div className={`flex flex-col  w-3/4 `}>
								<select
									id='product'
									name='product'
									className={`border-2 rounded-lg py-2 px-3  bg-white w-3/4 `}
									{...register('productId')}
								>
									<option value=''>Select Product</option>
									{products.map((product) => (
										<option
											key={product._id}
											value={product._id}
										>
											{product.name}
										</option>
									))}
								</select>
								{errors.productId && (
									<p className='text-red-500 text-xs'>
										{errors?.productId?.message}
									</p>
								)}
							</div>
						</div>

						<div className='my-4 flex mx-20 gap-10 justify-between'>
							<label
								htmlFor='phone'
								className='block text-sm font-bold mb-2'
							>
								Quantity :
							</label>
							<div className={`flex flex-col  w-3/4 `}>
								<input
									type='number'
									id='quantity'
									name='quantity'
									className={`border-2 rounded-lg py-2 px-3  bg-white w-3/4 `}
									{...register('quantity')}
								/>
								{errors.quantity && (
									<p className='text-red-500 text-xs'>
										{errors.quantity.message}
									</p>
								)}
							</div>
						</div>

						<div className='my-4 flex mx-20 gap-10 justify-between'>
							<label
								htmlFor='phone'
								className='block text-sm font-bold mb-2'
							>
								Shipping Cost :
							</label>
							<div className={`flex flex-col  w-3/4 `}>
								<input
									type='number'
									id='shipping_cost'
									name='shipping_cost'
									className={`border-2 rounded-lg py-2 px-3  bg-white w-3/4 `}
									{...register('shippingCost')}
								/>
								{errors.shippingCost && (
									<p className='text-red-500 text-xs'>
										{errors.shippingCost.message}
									</p>
								)}
							</div>
						</div>
						<div className='my-4 flex mx-20 gap-10 justify-between items-center'>
							<label
								htmlFor='phone'
								className='block text-sm font-bold mb-2'
							>
								Brands
							</label>
							<div className='flex gap-4 mt-4'>
								{/* Sample images */}
								<div className='relative'>
									<img
										src={DHL}
										alt='DHL'
										className={`cursor-pointer ${
											selectedImage?.includes('DHL') ? 'border-green-500' : ''
										}`}
										width={150}
										height={150}
										onClick={() => handleImageSelect('DHL')}
									/>{' '}
									{selectedImage?.includes('DHL') && (
										<svg
											xmlns='http://www.w3.org/2000/svg'
											width='1em'
											height='1em'
											viewBox='0 0 24 24'
											className='h-6 w-6 text-green-500 absolute top-2 right-2'
										>
											<path
												fill='currentColor'
												d='M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10s10-4.5 10-10S17.5 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8z'
											/>
										</svg>
									)}
								</div>
								{/* Add more sample images here */}
								<div className='relative'>
									<img
										src={TCS}
										alt='TCS'
										className={`cursor-pointer ${
											selectedImage?.includes('TCS') ? 'border-green-500' : ''
										}`}
										onClick={() => handleImageSelect('TCS')}
										width={150}
										height={150}
									/>
									{selectedImage?.includes('TCS') && (
										<svg
											xmlns='http://www.w3.org/2000/svg'
											width='1em'
											height='1em'
											viewBox='0 0 24 24'
											className='h-6 w-6 text-green-500 absolute top-2 right-2'
										>
											<path
												fill='currentColor'
												d='M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10s10-4.5 10-10S17.5 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8z'
											/>
										</svg>
									)}
								</div>
								<div className='relative'>
									<img
										src={Leopards}
										alt='Leopards'
										className={`cursor-pointer ${
											selectedImage?.includes('Leopards')
												? 'border-green-500'
												: ''
										}`}
										onClick={() => handleImageSelect('Leopards')}
										width={150}
										height={150}
									/>
									{selectedImage?.includes('Leopards') && (
										<svg
											xmlns='http://www.w3.org/2000/svg'
											width='1em'
											height='1em'
											viewBox='0 0 24 24'
											className='h-6 w-6 text-green-500 absolute top-2 right-2'
										>
											<path
												fill='currentColor'
												d='M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10s10-4.5 10-10S17.5 2 12 2m-2 15l-5-5l1.41-1.41L10 14.17l7.59-7.59L19 8z'
											/>
										</svg>
									)}
								</div>
								{/* Add more sample images here */}
							</div>
						</div>

						<div className='flex justify-center'>
							<button
								type='submit'
								className='text-white bg-yellow-600 font-bold py-2 px-4 rounded-xl shadow-2xl flex gap-1'
							>
								Add Shipping
							</button>
						</div>
					</form>

					<div className='modal-action'>
						<form method='dialog'>
							{/* if there is a button, it will close the modal */}
							<button className='btn text-white font-bold py-2 px-4 rounded-lg shadow-2xl bg-red-700'>
								Close
							</button>
						</form>
					</div>
				</div>
			</dialog>
		</>
	);
};
