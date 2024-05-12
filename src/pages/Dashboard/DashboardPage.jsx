import React from 'react';
import { Dashboard } from '../../components/Dashboard/Dashboard';
import withAuth from '../../hooks/withAuth.jsx';

function DashboardPage() {
	return (
		<>
			<Dashboard />
		</>
	);
}

export default withAuth(DashboardPage);
