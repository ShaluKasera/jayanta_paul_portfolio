import React, { useState } from 'react';
import Logo from '../assets/logo.png';
import { Link } from 'react-router-dom';

const Header = () => {
  const [showLogin, setShowLogin] = useState(false);

  const toggleLogin = () => {
    setShowLogin(!showLogin);
  };

  const closeLogin = () => {
    setShowLogin(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add login logic here (API call etc.)
    alert('Login submitted');
    closeLogin();
  };

  return (
    <header className='w-full relative'>
      <div className='flex flex-row items-center justify-between p-4 sm:flex-row'>
        <div className='flex items-center space-x-3'>
          <img src={Logo} alt="Logo" className='w-[70px] h-[50px]' />
          <p className='text-xl sm:text-2xl mt-4'>Research Scholar</p>
        </div>
        <button
          onClick={toggleLogin}
          className='mt-3 sm:mt-0 link text-lg text-black '
        >
          Login
        </button>
      </div>

      {/* Popup Modal */}
      {showLogin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl p-6 w-80 relative shadow-lg">
            <button
              onClick={closeLogin}
              className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl"
            >
              &times;
            </button>
            <h2 className="text-xl font-semibold mb-4 text-center">Login</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                
                <input
                placeholder="Email"
                  type="email"
                  required
                  className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring bg-gray-50"
                />
              </div>
              <div>
                
                <input
                placeholder='Password'
                  type="password"
                  required
                  className="mt-1 w-full border rounded-md px-3 py-2 focus:outline-none focus:ring bg-gray-50"
                />
              </div>
              <button
                type="submit"
                className="w-full  py-2 b"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
