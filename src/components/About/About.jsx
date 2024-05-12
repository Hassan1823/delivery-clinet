import React from 'react';

export const About = () => {
	return (
		<>
			<div className='min-h-screen bg-[#E5E5E5]'>
				<div className='flex flex-col  justify-center py-20 rounded-lg '>
					<h1 className='text-4xl font-bold text-center text-black'>
						About Us
					</h1>

					<p className=' mt-4 px-28 text-black text-justify text-lg'>
						Welcome to Delivery Hero, an innovative project proposed by
						Centangle Interactive, designed to revolutionize the way store
						owners manage their online sales through social media platforms like
						Facebook and WhatsApp. At Delivery Hero, we are dedicated to
						providing a specialized web application that streamlines the entire
						process of order management, inventory tracking, and shipping label
						generation, all within the convenience of a web browser.
					</p>

					<p className=' mt-4 px-28 text-black text-lg text-start font-bold'>
						Objective:
					</p>
					<p className=' mt-4 px-28 text-black text-justify text-lg'>
						Our main objective at Delivery Hero is to simplify the lives of
						store owners engaged in online sales through social media platforms.
						We understand the challenges they face in manually processing
						orders, maintaining accurate inventory records, and efficiently
						coordinating shipping. Our goal is to provide a user-friendly
						interface where store owners can effortlessly input orders, thereby
						enhancing overall efficiency in their operations. By facilitating
						smooth order processing, accurate inventory tracking, and seamless
						shipping label generation, we aim to empower businesses to thrive in
						the dynamic landscape of e-commerce via social media platforms.
					</p>

					{/* What We Offer: */}
					<p className=' mt-4 px-28 text-black text-lg text-start font-bold'>
						What We Offer:
					</p>

					<p className=' mt-4 px-28 text-black text-justify text-lg'>
						Delivery Hero provides an integrated solution tailored to the
						specific needs of businesses selling products through social media
						platforms. Our web application offers the following key features:
					</p>

					{/* 
                    Order Management: Easily input orders received from social media platforms, streamlining the entire process for store owners. */}

					<div className=' mt-4 px-28 text-black text-justify text-lg'>
						<ol>
							<li>
								<span className='font-bold'> 1. Order Management:</span> Easily
								input orders received from social media platforms, streamlining
								the entire process for store owners.
							</li>
							<li>
								<span className='font-bold'> 2. Inventory Tracking:</span>{' '}
								Accurately monitor inventory levels in real-time, ensuring
								efficient management and restocking.
							</li>
							<li>
								<span className='font-bold'> 3. Shipping Integration:</span>{' '}
								Seamlessly generate shipping labels and coordinate shipping
								processes within the web-based platform, saving time and
								resources.
							</li>
						</ol>
					</div>

					<p className=' mt-4 px-28 text-black text-lg text-start font-bold'>
						Why Choose Delivery Hero:
					</p>

					<div className=' mt-4 px-28 text-black text-justify text-lg'>
						<ol>
							<li>
								<span className='font-bold'> 1. Efficiency:</span> Say goodbye
								to manual order processing and inventory tracking. With
								DeliveryHero, streamline your operations and focus on growing
								your business.
							</li>
							<li>
								<span className='font-bold'> 2. Accuracy:</span> Reduce errors
								and delays with our precise inventory tracking and automated
								shipping label generation.
							</li>
							<li>
								<span className='font-bold'> 3. Customer Satisfaction:</span>{' '}
								Enhance the shopping experience for your customers by ensuring
								timely order processing and delivery.
							</li>
						</ol>
					</div>
				</div>
			</div>
		</>
	);
};
