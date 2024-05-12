import React from 'react';
import { HeroSection } from './HeroSection';
import { CategorySection } from './CategorySection';
import { BussinessSection } from './BussinessSection';
import { Company } from './Company';

function LandingPage() {
	return (
		<>
			<HeroSection />
			<CategorySection />
			<BussinessSection />
			<Company />
		</>
	);
}

export default LandingPage;
