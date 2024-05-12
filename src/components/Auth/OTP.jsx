import React, { useState, useRef, useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../context/AuthContext';

export const OTP = () => {
    const { setIsLogged } = useAuthContext();
  const [otp, setOtp] = useState(new Array(6).fill(''));
  const [otpError, setOtpError] = useState('');
  const otpBoxReference = useRef([]);
const navigate=useNavigate();
  const handleChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input
    if (value && index < otp.length - 1) {
      otpBoxReference.current[index + 1].focus();
    }
  };

  const handleBackspaceAndEnter = (e, index) => {
    if (e.key === 'Backspace' && index > 0) {
      otpBoxReference.current[index - 1].focus();
    } else if (e.key === 'Enter') {
      otpBoxReference.current[index].blur();
      // Here you can add the submit function
    }
  };
  const validateOTP=async()=>{
    const otpValue = otp.join('');
    if (otpValue.length !== 6) {
      setOtpError('Please enter a 6 digit OTP');
    } else {
      setOtpError('');
      // Here you can add the submit function
      try {
        const response = await fetch('/api/auth/verifyotp', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ otp: otpValue }), // Ensure otpValue is correctly structured
        });
    
        if (!response.ok) {
            // Attempt to read the response as text first to avoid JSON parsing errors
            const contentType = response.headers.get('Content-Type');
            if (contentType && contentType.includes('application/json')) {
                const errorData = await response.json();
                console.error('Error verifying OTP:', errorData);
                toast.error(errorData);
                throw new Error(errorData.message || `Server error: ${response.status}`);
            } else {
                // Handle non-JSON responses, possibly HTML error pages
                const errorText = await response.text();
                console.error('Error verifying OTP:', errorText);
                throw new Error(`Server returned a non-JSON response: ${response.status}`);
            }
        }
    
        const responseData = await response.json();
        console.log('OTP verification successful:', responseData);
        toast.success('OTP verification successful')
        localStorage.setItem('user', JSON.stringify(responseData));
			setIsLogged(true);
        navigate('/dashboard');
    } catch (error) {
        console.error('Error during OTP verification:', error);
        toast.error('Error during OTP verification')
        //window.location.reload();
    }
     }
    }
  useEffect(() => {
    otpBoxReference.current[0].focus();
  }, []);

  return (
    <article className="p-4">
      <h1 className="text-2xl text-center text-black mb-6">OTP Verification</h1>
      <p className="text-base text-center text-black mt-6 mb-4">One Time Password (OTP)</p>
      <div className='flex items-center justify-center gap-4'>
        {otp.map((digit, index) => (
          <input
            key={index}
            value={digit}
            maxLength={1}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyUp={(e) => handleBackspaceAndEnter(e, index)}
            ref={(reference) => (otpBoxReference.current[index] = reference)}
            className={`border w-20 h-auto text-white p-3 rounded-md block bg-black focus:border-2 focus:outline-none appearance-none`}
          />
        ))}
      </div>
      <div className="text-center mt-4">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={validateOTP}>
          Verify
        </button >
      </div>
      <p className={`text-lg text-white mt-4 ${otpError ? 'error-show' : ''}`}>{otpError}</p>
    </article>
  );
};