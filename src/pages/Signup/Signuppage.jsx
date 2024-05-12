import React from 'react';
import { SignUp } from '../../components/Auth/SignUp';
import { Footer } from '../../components/Footer/Footer';
import { NavBar } from '../../components/Navbar/NavBar';
export const Signuppage = () => {
	return (
		<>
			<NavBar />
			<SignUp />
			<Footer />
		</>
	);
};
