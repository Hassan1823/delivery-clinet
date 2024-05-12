import React from 'react';
import { Footer } from '../../components/Footer/Footer';
import { NavBar } from '../../components/Navbar/NavBar';
import { TrackOrder } from '../../components/TrackOrder/TrackOrder';

export const TrackOrderHome = () => {
	return (
		<>
			<NavBar />
			<TrackOrder />
			<Footer />
		</>
	);
};
