import React from 'react';
import { Link } from 'react-router-dom';

export const Error404 = () => {
	return (
		<section class='flex items-center h-screen p-16 bg-[#E5E5E5] '>
			<div class='container flex flex-col items-center '>
				<div class='flex flex-col gap-6 max-w-md text-center'>
					<h2 class='font-extrabold text-9xl text-[#282828] '>
						<span class='sr-only'>Error</span>404
					</h2>
					<p class='text-2xl md:text-3xl text-[#DF6951]'>
						Sorry, we couldn't find this page.
					</p>
					<Link
						to='/'
						class='px-8 py-4 text-xl font-semibold rounded bg-yellow-600 text-gray-50 hover:text-gray-200'
					>
						Back to home
					</Link>
				</div>
			</div>
		</section>
	);
};
