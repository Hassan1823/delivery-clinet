import React, { useState, useEffect } from 'react';
// import { FaShippingFast, FaEdit } from 'react-icons/fa';
// import { MdOutlineDeleteSweep } from 'react-icons/md';
// import { IoMdAddCircleOutline } from 'react-icons/io';
import { AddShipping } from './AddShipping';
import { FloatButton } from 'antd';
import { jsPDF } from 'jspdf';
import JsBarcode from 'jsbarcode';
import QRCode from 'qrcode';
import { Link } from 'react-router-dom';
import { Hourglass } from 'react-loader-spinner';

export const Shipping = () => {
	const [shippings, setShippings] = useState([]);
	const [loading, setLoading] = useState(false);

	const fetchShippings = async () => {
		try {
			setLoading(true);
			const response = await fetch('/api/shipping/view-shippings');
			if (response.ok) {
				const shippings = await response.json();
				// console.log(products);
				setShippings(shippings);
				setLoading(false);
			}
		} catch (error) {
			console.error('Error during product addition:', error);
		}
	};

	const generateChallanPDF = (data) => {
		console.log(data);
		const doc = new jsPDF('landscape');
		const currentTime = new Date().toLocaleString();
		const unixtime = new Date().getTime();

		// Create a label to print out the shipping detail in the center of the page with a border
		doc.text('Shipping Label', 105, 10, { align: 'center' });

		// Generate barcode
		const barcodeValue = data._id;
		const barcodeOptions = {
			format: 'CODE128',
			displayValue: true,
			fontSize: 10,
			width: 2,
			height: 30,
			text: barcodeValue, // Display the tracking ID number as text below the barcode
		};
		const barcodeCanvas = document.createElement('canvas');
		JsBarcode(barcodeCanvas, barcodeValue, barcodeOptions);
		const barcodeDataURL = barcodeCanvas.toDataURL();

		// Add barcode image to the PDF document
		doc.addImage(barcodeDataURL, 'PNG', 10, 20, 100, 50);

		// Then, display the tracking number itself with a heading "Tracking No" and the tracking number
		doc.text('Tracking No', 10, 80);
		doc.text(data._id, 10, 90);

		// Display the shipping details
		doc.text('Shipping Details', 10, 100);
		doc.text(`Brand : ${data.brand}`, 10, 110);
		doc.text(`Customer : ${data.customer.name}`, 10, 120);
		doc.text(`Phone : ${data.customer.phone}`, 10, 130);
		doc.text(`Shipping Cost : ${data.totalPrice}`, 10, 140);
		doc.text(`Quantity : ${data.quantity}`, 10, 150);
		doc.text(`Weight : ${data.totalWeight / 1000} kg`, 10, 160);
		doc.text(`Shipping : ${data.brand}`, 10, 170);
		doc.text(`Tracking No : ${data._id}`, 10, 180);
		const qrCodeCanvas = document.createElement('canvas');
		const qrCodeValue = JSON.stringify(data);
		const qrCodeOptions = {
			width: 50,
			height: 50,
		};
		QRCode.toCanvas(qrCodeCanvas, qrCodeValue, qrCodeOptions, function (error) {
			if (error) {
				console.error('Error generating QR code:', error);
				return;
			}
			const qrCodeDataURL = qrCodeCanvas.toDataURL();

			// Add QR code image to the PDF document at the bottom
			doc.addImage(qrCodeDataURL, 'PNG', 10, 250, 50, 50);

			doc.save(`shipping-${data._id}.pdf`);
		});

		doc.save(`shipping-${data._id}.pdf`);
	};

	// add download csv function

	const downloadeCSV = () => {
		const currentDate = new Date().toISOString().slice(0, 10);
		const fileName = `shipping_${currentDate}.csv`;

		const csvContent =
			'data:text/csv;charset=utf-8,' +
			'Time,Customer,Phone,Shipping Cost,Quantity,Weight,shipping,tracking no \n' +
			shippings
				.map(
					(shipping) =>
						`${new Date(shipping.createdAt).toLocaleString()},${
							shipping.customer.name
						},${shipping.customer.phone},${shipping.totalPrice},${
							shipping.quantity
						},${shipping.totalWeight / 1000} kg,${shipping.brand},${
							shipping._id
						}`
				)
				.join('\n');

		const encodedUri = encodeURI(csvContent);
		const link = document.createElement('a');
		link.setAttribute('href', encodedUri);
		link.setAttribute('download', fileName);
		document.body.appendChild(link);
		link.click();
	};

	useEffect(() => {
		fetchShippings();
	}, []);
	return (
		<>
			<div
				id='shipping'
				className='flex flex-col py-10 px-20 min-h-screen text-black w-full gap-5'
			>
				<div className='flex items-center justify-between'>
					<div className='text-2xl'>All Customers</div>
					<div className='max-w-xs text-lg breadcrumbs'>
						<ul>
							<li>Dashboard</li>
							<li>Shipping</li>
						</ul>
					</div>
				</div>

				<div className='flex flex-col gap-5 bg-slate-50 p-5 rounded-lg shadow-xl'>
					<div className='overflow-x-auto'>
						<div className='flex items-center gap-3'>
							<div className='badge indicator'>All </div>
							<div className='badge badge-neutral'>Ready to Send</div>
							<div className='badge badge-primary'>Prepare to send </div>
							<div className='badge badge-secondary'>Get into the system</div>
							<div className='badge badge-accent'>delivery</div>
							<div className='badge badge-ghost'>
								the customers recieve the items
							</div>
							<div className='badge badge-secondary'>return orign</div>
							<div className='badge badge-accent'>cancel</div>
						</div>
					</div>
				</div>
				<div className='flex flex-col gap-5 bg-slate-50 p-5 rounded-lg shadow-xl'>
					<div className='flex justify-between items-center'>
						<button
							className='text-white bg-yellow-600 font-bold py-2 px-4 rounded-xl shadow-2xl '
							onClick={downloadeCSV}
						>
							Download CSV
						</button>
						<AddShipping refresh={fetchShippings} />
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
										<th>Time</th>
										<th>Customer</th>
										<th>Phone</th>
										<th>Total Cost</th>
										<th>Quantity</th>
										<th>Weight</th>
										<th>shipping</th>
										<th>tracking no</th>
										<th>Download Label</th>
									</tr>
								</thead>
								<tbody>
									{/* row 1 */}

									{shippings.length === 0 ? (
										<div className='flex justify-center text-xl font-semibold w-full'>
											No Shipping found
										</div>
									) : (
										<>
											{shippings.map((shipping, index) => (
												<tr key={shipping?._id}>
													<td>{index + 1}</td>

													{/* formate the time  */}
													<td>
														{new Date(shipping?.createdAt).toLocaleString()}
													</td>

													<td>{shipping?.customer?.name}</td>
													<td>{shipping?.customer?.phone}</td>
													<td>{shipping?.totalPrice}</td>
													<td>{shipping?.quantity}</td>
													<td>{shipping?.totalWeight / 1000} kg</td>
													<td>{shipping?.brand}</td>

													{/* add dynamic routing to the tracking number */}
													<td>
														<Link to={`/orders/${shipping?._id}`}>
															{shipping?._id}
														</Link>
													</td>

													<td>
														<button
															className='text-white bg-yellow-600 font-bold py-2 px-4 rounded-xl shadow-2xl '
															onClick={() => generateChallanPDF(shipping)}
														>
															Download
														</button>
													</td>
												</tr>
											))}
										</>
									)}
								</tbody>
								{/* foot */}
								<tfoot>
									<tr>
										<th></th>
										<th>Time</th>
										<th>Customer</th>
										<th>Phone</th>
										<th>Total Cost</th>
										<th>Quantity</th>
										<th>Weight</th>
										<th>shipping</th>
										<th>tracking no</th>
										<th>Download Label</th>
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
