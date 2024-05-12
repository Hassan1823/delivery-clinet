import React from 'react';
import { Footer } from '../../components/Footer/Footer';
import { NavBar } from '../../components/Navbar/NavBar';
import { Feature } from '../../components/Feature/Feature';
import { Company } from '../../components/MainPage/Company';

export const FeaturesPages = () => {
	return (
		<>
			<NavBar />
			<Feature />
			<Company />
			<Footer />
		</>
	);
};
