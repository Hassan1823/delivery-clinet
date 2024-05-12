import React from 'react';
import { Login } from '../../components/Auth/Login';
import { Footer } from '../../components/Footer/Footer';
import { NavBar } from '../../components/Navbar/NavBar';

export const LoginPage = () => {
	return (
		<>
			<NavBar />
			<Login />
			<Footer />
		</>
	);
};
