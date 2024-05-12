import React from 'react';

export const Footer = () => {
	return (
		<>
			<footer className='footer p-10 bg-[#E5E5E5] text-black'>
				<aside>
					<p className='text-4xl'>Delivery Hero</p>
					<p>
						Empower your online business <br />
						with Delivery Hero
					</p>
				</aside>
				<nav>
					<h6 className='footer-title'>Comapany</h6>
					<a className='link link-hover'>About</a>
					<a className='link link-hover'>Careers</a>
					<a className='link link-hover'>Mobile</a>
				</nav>
				<nav>
					<h6 className='footer-title'>Contact</h6>
					<a className='link link-hover'>help FAQ</a>
					<a className='link link-hover'>Press</a>
					<a className='link link-hover'>Affilates</a>
				</nav>
				<nav>
					<h6 className='footer-title'>More</h6>
					<a className='link link-hover'>track</a>
					<a className='link link-hover'>Features</a>
					<a className='link link-hover'>Reviews</a>
				</nav>
			</footer>
		</>
	);
};
