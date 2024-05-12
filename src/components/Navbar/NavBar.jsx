import React from 'react';
import Logo from '../../assets/images/logo.png';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';

export const NavBar = () => {
	const { logoutHandler, isLogged } = useAuthContext();

	const handleLogout = async () => {
		try {
			await logoutHandler();
		} catch (error) {}
	};
	return (
		<div className='navbar bg-[#E5E5E5] '>
			<div className='navbar-start'>
				<div className='dropdown'>
					<div
						tabIndex={0}
						role='button'
						className='btn btn-ghost lg:hidden'
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='h-5 w-5'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='M4 6h16M4 12h8m-8 6h16'
							/>
						</svg>
					</div>
					<ul
						tabIndex={0}
						className='menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-52'
					>
						<li>
							<Link to={'/'}>Home</Link>
						</li>
						<li>
							<Link to={'/aboutus'}>AboutUS</Link>
						</li>
						<li>
							<Link to={'/contactus'}>ContactUS</Link>
						</li>
						<li>
							<Link to={'/features'}>Features</Link>
						</li>
						<li>
							<Link to={'/login'}>Login</Link>
						</li>
						<li>
							<Link to={'/signup'}>Signup</Link>
						</li>
						<li>
							<Link to={'/dashboard'}>Dashboard</Link>
						</li>
						<li>
							<Link to={'/trackorder'}>Track Order</Link>
						</li>
					</ul>
				</div>
				<a className=' text-xl'>
					<img
						src={Logo}
						alt='Logo'
						className='h-20 w-20'
					/>
				</a>
			</div>
			<div className='navbar-center hidden lg:flex'>
				<ul className='menu menu-horizontal px-1 text-black text-lg'>
					<li>
						<Link to={'/'}>Home</Link>
					</li>
					<li>
						<Link to={'/aboutus'}>AboutUS</Link>
					</li>
					<li>
						<Link to={'/contactus'}>ContactUS</Link>
					</li>
					<li>
						<Link to={'/features'}>Features</Link>
					</li>
					<li>
						<Link to={'/Trackorder'}>Track Order</Link>
					</li>
				</ul>
			</div>
			<div className='navbar-end hidden lg:flex gap-5'>
				{/* <Link
					to={'/login'}
					className='text-white bg-yellow-600 font-bold py-2 px-4 shadow-2xl'
				>
					Login
				</Link>
				<Link
					to={'/signup'}
					className='text-white bg-yellow-600 font-bold py-2 px-4 shadow-2xl'
				>
					Signup
				</Link>
				<Link
					to={'/dashboard'}
					className='text-white bg-yellow-600 font-bold py-2 px-4 shadow-2xl'
				>
					Dashboard
				</Link> */}

				{isLogged ? (
					<>
						<Link
							to={'/dashboard'}
							className='text-white bg-yellow-600 font-bold py-2 px-4 shadow-2xl'
						>
							Dashboard
						</Link>
						<Link
							className='text-white bg-yellow-600 font-bold py-2 px-4 shadow-2xl'
							onClick={handleLogout}
						>
							Logout
						</Link>{' '}
					</>
				) : (
					<>
						<Link
							to={'/login'}
							className='text-white bg-yellow-600 font-bold py-2 px-4 shadow-2xl'
						>
							Login
						</Link>

						<Link
							to={'/signup'}
							className='text-white bg-yellow-600 font-bold py-2 px-4 shadow-2xl'
						>
							Signup
						</Link>
					</>
				)}
			</div>
		</div>
	);
};
