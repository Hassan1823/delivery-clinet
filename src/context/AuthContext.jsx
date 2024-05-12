import { createContext, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export const AuthContext = createContext();

export const useAuthContext = () => {
	return useContext(AuthContext);
};

export function AuthProvider({ children }) {
	const [user, setUser] = useState(null);
	const [isLogged, setIsLogged] = useState(false);

	useEffect(() => {
		const user = JSON.parse(localStorage.getItem('user'));
		if (user) {
			setUser(user);
			setIsLogged(true);
		}
	}, []);

	const logoutHandler = async () => {
		try {
			const response = await fetch('/api/auth/logout', {
				method: 'POST', // or 'GET' depending on your server's configuration
				headers: { 'Content-Type': 'application/json' }, // Include credentials (cookies) in the request
			});
	
			// Check if the response has content before parsing it as JSON
			const data = response.headers.get('content-length') > 0 ? await response.json() : {};
	
			// Assuming your API returns an error field in JSON when there's an error
			if (data.error) {
				throw new Error(data.error);
			}
	
			localStorage.removeItem('user');
			setUser(null);
			setIsLogged(false);
			toast.success('Logged out successfully');
			// Consider using react-router for navigation instead of reloading the page
			window.location.reload();
		} catch (error) {
			console.error(error);
			toast.error(error.message);
		}
	};

	return (
		<AuthContext.Provider
			value={{ user, setUser, logoutHandler, isLogged, setIsLogged }}
		>
			{children}
		</AuthContext.Provider>
	);
}
