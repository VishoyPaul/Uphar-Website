import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {

  const navigator = useNavigate();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    mobile: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });

  const handleGoogleSucess=(credentialResponse)=>{
    const decode = jwtDecode(credentialResponse.credential);
    console.log(decode.name)
    console.log(decode.email)
    console.log(decode.picture);
    navigator('/')
  }

  const handelGoogleError=()=>{
    console.log('Error in Login');
    alert('Google Error in signup')
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Console log all form data
    console.log('=== COMPLETE SIGNUP DATA ===');
    console.log('First Name:', formData.firstName);
    console.log('Last Name:', formData.lastName);
    console.log('Mobile Number:', formData.mobile);
    console.log('Email:', formData.email);
    console.log('Password:', formData.password);
    console.log('Confirm Password:', formData.confirmPassword);
    console.log('Agree to Terms:', formData.agreeToTerms);
    console.log('=== END OF DATA ===');
    console.log('Complete Object:', formData);
    
    // Validation
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    
    if (!formData.agreeToTerms) {
      alert('Please agree to terms and conditions');
      return;
    }
    
    alert('Form submitted successfully! Check console for data.');
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="m-5 flex flex-col gap-2.5 bg-white p-7 w-[450px] rounded-[20px] shadow-[0_10px_15px_-3px_rgba(0,0,0,0.1),0_4px_6px_-2px_rgba(0,0,0,0.05)] font-sans"
    >
      <h2 className="text-2xl font-bold text-center mb-4 text-[#151717]">Sign Up</h2>

      {/* First Name */}
      <div className="flex flex-col">
        <label className="text-[#151717] font-semibold">First Name</label>
      </div>
      <div className="border-[1.5px] border-[#ecedec] rounded-[10px] h-[50px] flex items-center pl-2.5 transition-all duration-200 ease-in-out focus-within:border-[#2d79f3]">
        <svg height={20} width={20} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
        </svg>
        <input 
          type="text" 
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          className="ml-2.5 rounded-[10px] border-none w-[85%] h-full outline-none font-sans" 
          placeholder="Enter your first name" 
          required
        />
      </div>

      {/* Last Name */}
      <div className="flex flex-col">
        <label className="text-[#151717] font-semibold">Last Name</label>
      </div>
      <div className="border-[1.5px] border-[#ecedec] rounded-[10px] h-[50px] flex items-center pl-2.5 transition-all duration-200 ease-in-out focus-within:border-[#2d79f3]">
        <svg height={20} width={20} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
        </svg>
        <input 
          type="text" 
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          className="ml-2.5 rounded-[10px] border-none w-[85%] h-full outline-none font-sans" 
          placeholder="Enter your last name" 
          required
        />
      </div>

      {/* Mobile Number */}
      <div className="flex flex-col">
        <label className="text-[#151717] font-semibold">Mobile Number</label>
      </div>
      <div className="border-[1.5px] border-[#ecedec] rounded-[10px] h-[50px] flex items-center pl-2.5 transition-all duration-200 ease-in-out focus-within:border-[#2d79f3]">
        <svg height={20} width={20} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
        </svg>
        <input 
          type="tel" 
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          className="ml-2.5 rounded-[10px] border-none w-[85%] h-full outline-none font-sans" 
          placeholder="Enter your mobile number" 
          required
        />
      </div>

      {/* Email */}
      <div className="flex flex-col">
        <label className="text-[#151717] font-semibold">Email</label>
      </div>
      <div className="border-[1.5px] border-[#ecedec] rounded-[10px] h-[50px] flex items-center pl-2.5 transition-all duration-200 ease-in-out focus-within:border-[#2d79f3]">
        <svg height={20} viewBox="0 0 32 32" width={20} xmlns="http://www.w3.org/2000/svg">
          <g id="Layer_3" data-name="Layer 3">
            <path d="m30.853 13.87a15 15 0 0 0 -29.729 4.082 15.1 15.1 0 0 0 12.876 12.918 15.6 15.6 0 0 0 2.016.13 14.85 14.85 0 0 0 7.715-2.145 1 1 0 1 0 -1.031-1.711 13.007 13.007 0 1 1 5.458-6.529 2.149 2.149 0 0 1 -4.158-.759v-10.856a1 1 0 0 0 -2 0v1.726a8 8 0 1 0 .2 10.325 4.135 4.135 0 0 0 7.83.274 15.2 15.2 0 0 0 .823-7.455zm-14.853 8.13a6 6 0 1 1 6-6 6.006 6.006 0 0 1 -6 6z" />
          </g>
        </svg>
        <input 
          type="email" 
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="ml-2.5 rounded-[10px] border-none w-[85%] h-full outline-none font-sans" 
          placeholder="Enter your Email" 
          required
        />
      </div>

      {/* Password */}
      <div className="flex flex-col">
        <label className="text-[#151717] font-semibold">Password</label>
      </div>
      <div className="border-[1.5px] border-[#ecedec] rounded-[10px] h-[50px] flex items-center pl-2.5 transition-all duration-200 ease-in-out focus-within:border-[#2d79f3]">
        <svg height={20} viewBox="-64 0 512 512" width={20} xmlns="http://www.w3.org/2000/svg">
          <path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0" />
          <path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0" />
        </svg>        
        <input 
          type="password" 
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="ml-2.5 rounded-[10px] border-none w-[85%] h-full outline-none font-sans" 
          placeholder="Enter your Password" 
          required
        />
      </div>

      {/* Confirm Password */}
      <div className="flex flex-col">
        <label className="text-[#151717] font-semibold">Confirm Password</label>
      </div>
      <div className="border-[1.5px] border-[#ecedec] rounded-[10px] h-[50px] flex items-center pl-2.5 transition-all duration-200 ease-in-out focus-within:border-[#2d79f3]">
        <svg height={20} viewBox="-64 0 512 512" width={20} xmlns="http://www.w3.org/2000/svg">
          <path d="m336 512h-288c-26.453125 0-48-21.523438-48-48v-224c0-26.476562 21.546875-48 48-48h288c26.453125 0 48 21.523438 48 48v224c0 26.476562-21.546875 48-48 48zm-288-288c-8.8125 0-16 7.167969-16 16v224c0 8.832031 7.1875 16 16 16h288c8.8125 0 16-7.167969 16-16v-224c0-8.832031-7.1875-16-16-16zm0 0" />
          <path d="m304 224c-8.832031 0-16-7.167969-16-16v-80c0-52.929688-43.070312-96-96-96s-96 43.070312-96 96v80c0 8.832031-7.167969 16-16 16s-16-7.167969-16-16v-80c0-70.59375 57.40625-128 128-128s128 57.40625 128 128v80c0 8.832031-7.167969 16-16 16zm0 0" />
        </svg>        
        <input 
          type="password" 
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="ml-2.5 rounded-[10px] border-none w-[85%] h-full outline-none font-sans" 
          placeholder="Confirm your Password" 
          required
        />
      </div>

      {/* Terms and Conditions */}
      <div className="flex items-center gap-2 mt-2">
        <input 
          type="checkbox" 
          name="agreeToTerms"
          checked={formData.agreeToTerms}
          onChange={handleChange}
          id="agreeToTerms"
          required
        />
        <label htmlFor="agreeToTerms" className="text-sm text-black font-normal">
          I agree to the <span className="text-[#2d79f3] cursor-pointer">Terms and Conditions</span>
        </label>
      </div>

      <button 
        type="submit"
        className="my-5 mb-2.5 bg-[#151717] border-none text-white text-[15px] font-medium rounded-[10px] h-[50px] w-full cursor-pointer hover:bg-[#252727] transition-colors"
      >
        Sign Up
      </button>

      <p className="text-center text-black text-sm my-1">
        Already have an account? 
        <span className="text-sm ml-1 text-[#2d79f3] font-medium cursor-pointer">Sign In</span>
      </p>

      <p className="text-center text-black text-sm my-1">Or Sign Up With</p>

      <div className="flex flex-row items-center gap-2.5 justify-between">
      
      <GoogleLogin onSuccess={handleGoogleSucess}
      onError={handelGoogleError}></GoogleLogin>

        <button 
          type="button"
          className="mt-2.5 w-full h-[50px] rounded-[10px] flex justify-center items-center font-medium gap-2.5 border border-[#ededef] bg-white cursor-pointer transition-all duration-200 ease-in-out hover:border-[#2d79f3]"
        >
          <svg version="1.1" height={20} width={20} id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 22.773 22.773" style={{enableBackground: 'new 0 0 22.773 22.773'}} xmlSpace="preserve">
            <g>
              <g>
                <path d="M15.769,0c0.053,0,0.106,0,0.162,0c0.13,1.606-0.483,2.806-1.228,3.675c-0.731,0.863-1.732,1.7-3.351,1.573 c-0.108-1.583,0.506-2.694,1.25-3.561C13.292,0.879,14.557,0.16,15.769,0z" />
                <path d="M20.67,16.716c0,0.016,0,0.03,0,0.045c-0.455,1.378-1.104,2.559-1.896,3.655c-0.723,0.995-1.609,2.334-3.191,2.334 c-1.367,0-2.275-0.879-3.676-0.903c-1.482-0.024-2.297,0.735-3.652,0.926c-0.155,0-0.31,0-0.462,0 c-0.995-0.144-1.798-0.932-2.383-1.642c-1.725-2.098-3.058-4.808-3.306-8.276c0-0.34,0-0.679,0-1.019 c0.105-2.482,1.311-4.5,2.914-5.478c0.846-0.52,2.009-0.963,3.304-0.765c0.555,0.086,1.122,0.276,1.619,0.464 c0.471,0.181,1.06,0.502,1.618,0.485c0.378-0.011,0.754-0.208,1.135-0.347c1.116-0.403,2.21-0.865,3.652-0.648 c1.733,0.262,2.963,1.032,3.723,2.22c-1.466,0.933-2.625,2.339-2.427,4.74C17.818,14.688,19.086,15.964,20.67,16.716z" />
              </g>
            </g>
          </svg>
          Apple 
        </button>
      </div>
    </form>
  );
}

export default SignupForm;  