import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if the user is already logged in when the component mounts
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true); // Set logged-in status based on the token
    }
  }, []);

  return (
    <div>
      <Header setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn} />
      <main className="min-h-[77vh]">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
