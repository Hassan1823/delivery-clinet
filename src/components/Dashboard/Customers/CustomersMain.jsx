import React, { useEffect, useState } from 'react';
import { FaShippingFast, FaEdit } from 'react-icons/fa';
import { MdOutlineDeleteSweep } from 'react-icons/md';
import { IoMdAddCircleOutline } from 'react-icons/io';
import { AddCustomer } from './AddCustomer';
import { Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import { FloatButton } from 'antd';
import toast from 'react-hot-toast';
import { Hourglass } from 'react-loader-spinner';

export const CustomersMain = () => {
	const [customers, setCustomers] = useState([]);
	const [updateCustomerID, setUpdateCustomerID] = useState('');
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	useEffect(() => {
		fetchCustomers();
	}, []);
	useEffect(() => {
		fetchCustomers();
	}, [updateCustomerID]);

	const fetchCustomers = async () => {
		try {
			setLoading(true);
			const response = await fetch(`/api/customer/getcustomers`);
			if (response.ok) {
				const Customers = await response.json();
				console.log(Customers);
				setCustomers(Customers);
				setLoading(false);
			}
		} catch (error) {
			console.error('Error during customers addition:', error);
		}
	};

	const onDelete = (id) => {
		Modal.confirm({
			title:
				'Are you sure you want to delete? associated details will be effect (shipping)',
			onOk: () => {
				fetch(`/api/customer/deletecustomer/${id}`, {
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json',
					},
				}).then((res) => {
					console.log('res', res.message);
					if (res.ok) {
						console.log('deleted successful');
						toast.success('deleted successful');
						fetchCustomers();
					} else {
						console.log('deleted failed');
						toast.error('deleted failed');
					}
				});
			},
			okText: 'Delete',
			maskClosable: true,
			okButtonProps: {
				style: {
					backgroundColor: 'red',
				},
			},
		});
	};

	const downloadCSV = () => {
		const currentDate = new Date().toISOString().slice(0, 10); // Get current date in YYYY-MM-DD format
		const fileName = `customers_${currentDate}.csv`; // Add date to the file name

		const csvContent =
			'data:text/csv;charset=utf-8,' +
			'Name,Phone,Address,Delivery,Sales Channel, social Username, Created at \n' + // Add titles
			customers
				.map(
					(customer) =>
						`${customer.name},${customer.phone},${customer.address},${customer.delivery},${customer.salesChannel},${customer.socialUsername},${customer.createdAt}`
				)
				.join('\n');

		const encodedUri = encodeURI(csvContent);
		const link = document.createElement('a');
		link.setAttribute('href', encodedUri);
		link.setAttribute('download', fileName);
		document.body.appendChild(link);
		link.click();

		toast.success(' Download successful ');
	};
	return (
		<>
			<div className='flex flex-col py-10 px-20 min-h-screen text-black w-full gap-5'>
				<div className='flex items-center justify-between'>
					<div className='text-2xl'>All Customers</div>
					<div className='max-w-xs text-lg breadcrumbs'>
						<ul>
							<li>Dashboard</li>
							<li>Customers</li>
						</ul>
					</div>
				</div>
				<div className='flex flex-col gap-5 bg-slate-50 p-5 rounded-lg shadow-xl'>
					<div className='flex justify-between'>
						<button
							className='text-white bg-yellow-600 font-bold py-2 px-4 rounded-xl shadow-2xl flex gap-1'
							onClick={downloadCSV}
						>
							Download CSV
						</button>
						<AddCustomer refresh={fetchCustomers} />
					</div>
					<div className='flex bg-inherit bg-slate-50'>
						<input
							className='input input-bordered join-item bg-slate-50 w-full'
							placeholder='search'
						/>
					</div>

					{loading ? (
						<>
							<div className='flex justify-center'>
								<Hourglass
									visible={true}
									height='80'
									width='80'
									ariaLabel='hourglass-loading'
									wrapperStyle={{}}
									wrapperClass=''
									colors={['#CA8A04', '#000000']}
								/>
							</div>
						</>
					) : (
						<div className='overflow-x-auto'>
							<table className='table'>
								{/* head */}
								<thead>
									<tr>
										<th>#</th>
										<th>Customr Name</th>
										<th>Phone</th>
										<th>Address</th>
										<th>Delivery</th>
										<th>sales chanel</th>

										<th>Actions</th>
									</tr>
								</thead>
								<tbody>
									{/* rows */}
									{customers.length === 0 ? (
										<div className='flex justify-center text-xl font-semibold w-full'>
											No Customer found
										</div>
									) : (
										<>
											{customers.map((customer, index) => (
												<tr key={customer._id}>
													<td>{index + 1}</td>
													<td>
														<div>
															<div className='font-bold'>{customer?.name}</div>
														</div>
													</td>
													<td>{customer?.phone}</td>
													<td>{customer?.address}</td>

													<td>{customer?.delivery || 0}</td>
													<td>{customer?.salesChannel}</td>

													<td>
														<div className='flex gap-3'>
															<button
																className=' py-2 px-4 rounded-xl shadow-2xl'
																onClick={() => {
																	setUpdateCustomerID(customer?._id);
																	document
																		.getElementById('updatecustomer')
																		.showModal();
																}}
															>
																<FaEdit className='text-2xl text-yellow-600' />
															</button>
															<button
																className=' py-2 px-4 rounded-xl shadow-2xl'
																onClick={() => {
																	onDelete(customer?._id);
																}}
															>
																<MdOutlineDeleteSweep className='text-2xl text-red-600 ' />
															</button>
														</div>
													</td>
												</tr>
											))}
										</>
									)}
								</tbody>
								{/* foot */}
								<tfoot>
									<tr>
										<th>#</th>
										<th>Customr Name</th>
										<th>Phone</th>
										<th>Address</th>
										<th>Delivery</th>
										<th>sales chanel</th>

										<th>Actions</th>
									</tr>
								</tfoot>
							</table>
						</div>
					)}
				</div>
			</div>
			<FloatButton.BackTop />
		</>
	);
};
