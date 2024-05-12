import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast'; // Ensure you have imported toast from react-toastify

function Forgetpass() {
    const [email, setEmail] = useState('');
    const navigate = useNavigate(); // Added useNavigate hook for navigation

    // Corrected function to simulate sending an email
    const sendRecoveryEmail = async (email) => {
        const response = await fetch('/api/auth/forgot-password', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }), // Corrected to send an object with email
        });
        const responseData = await response.json();

        if (!response.ok) {
            const errorMessage = responseData.message || `Server error: ${response.status}`;
            throw new Error(errorMessage);
        }

        toast.success('Email sent successfully');
        // Assuming reset() was meant to clear the email state or navigate
        setEmail(''); // Clear email input after successful operation
        // navigate('/some-path'); // Optionally navigate to another route
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await sendRecoveryEmail(email);
            // Optionally navigate to another route on success
            // navigate('/login');
        } catch (error) {
            toast.error(error.message); // Display error message using toast
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-3 rounded-xl bg-white shadow-lg">
                <h1 className="text-xl font-semibold text-center">Forgot Password</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="text-sm font-medium">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={email}
                            onChange={handleEmailChange}
                            required
                            className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button type="submit" className="w-full p-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        Reset Password
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Forgetpass;