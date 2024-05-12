import { useEffect, useState } from 'react';

const withAuth = (WrappedComponent) => {
	return (props) => {
		const [verified, setVerified] = useState(false);

		useEffect(() => {
			const user = localStorage.getItem('user');
			if (!user) {
				window.location.replace('/login');
			} else {
				setVerified(true);
			}
		}, []);

		if (verified) {
			return <WrappedComponent {...props} />;
		} else {
			return null;
		}
	};
};

export default withAuth;
