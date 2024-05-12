import React from 'react';
import LandingPage from '../../components/MainPage/LandingPage';
import { Footer } from '../../components/Footer/Footer';
import { NavBar } from '../../components/Navbar/NavBar';

export const Mainpage = () => {
	return (
		<>
			<NavBar />
			<LandingPage />
			<Footer />
		</>
	);
};
