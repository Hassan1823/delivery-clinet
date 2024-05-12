import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { AuthProvider } from './context/AuthContext.jsx';
import toast, { Toaster } from 'react-hot-toast';

ReactDOM.createRoot(document.getElementById('root')).render(
	<AuthProvider>
		<React.StrictMode>
			<App />
			<Toaster
				position='top-center'
				reverseOrder={false}
			/>
		</React.StrictMode>
	</AuthProvider>
);
