import React, { useEffect, useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';
import LogoImage from '../assets/autoFixLogo.png';
import GarageLoading from '../components/GarageLoading';

const NavBar = () => {
  const [userRole, setUserRole] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const syncAuthStatus = () => {
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUserRole(storedUser?.role || '');

  };

  useEffect(() => {
    syncAuthStatus();
    window.addEventListener('storage', syncAuthStatus);
    return () => window.removeEventListener('storage', syncAuthStatus);
  }, []);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/api/auth/logout`, {
        method: 'POST',
        credentials: 'include',
      });

      localStorage.removeItem('user');
      window.dispatchEvent(new Event('storage'));
      navigate('/login');
    } catch (err) {
      console.error('Logout failed:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className=' px-4 py-3 flex justify-between items-center relative z-50'>
      {/* Logo */}
      <Link to='/' className='flex items-center gap-2'>
        <img src={LogoImage} alt="AutoFix Garage Logo" className='h-10 w-auto' />
        <span className='text-xl sm:text-2xl font-bold text-yellow-400'>AutoFix Garage</span>
      </Link>

      {/* Hamburger Menu Icon */}
      <div className='sm:hidden text-white text-2xl cursor-pointer' onClick={toggleMobileMenu}>
        {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
      </div>

      {/* Desktop Menu */}
      <ul className='hidden sm:flex gap-6 text-sm text-white font-medium'>
        <NavLink to="/form" className="hover:text-yellow-300">BOOK</NavLink>
        <NavLink to="/status" className="hover:text-yellow-300">STATUS</NavLink>
        <NavLink to="/about" className="hover:text-yellow-300">ABOUT</NavLink>
        <NavLink to="/contact-us" className="hover:text-yellow-300">CONTACT</NavLink>
      </ul>

      {/* Profile / Login / Logout */}
      <div className="hidden sm:block relative group text-white">

        <Link to="/myprofile">
          <FaUserCircle className="text-2xl" />
        </Link>

        <div className='group-hover:block hidden absolute right-0 pt-4 z-10'>
          <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-600 rounded shadow-lg'>
            {!userRole ? (
              <Link to="/login" className='hover:text-black'>Login</Link>
            ) : (
              <button onClick={handleLogout} className='hover:text-black cursor-pointer'>Logout</button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className='absolute top-16 left-0 w-full bg-gray-600 text-white flex flex-col gap-4 py-4 px-6 sm:hidden shadow-lg'>
          <NavLink to="/form" onClick={toggleMobileMenu}>BOOK</NavLink>
          <NavLink to="/status" onClick={toggleMobileMenu}>STATUS</NavLink>
          <NavLink to="/about" onClick={toggleMobileMenu}>ABOUT</NavLink>
          <NavLink to="/contact-us" onClick={toggleMobileMenu}>CONTACT</NavLink>
          <Link to="/myprofile" onClick={toggleMobileMenu}>
              <p>MY PROFILE</p>
          </Link>
          {!userRole ? (
            <Link to="/login" onClick={toggleMobileMenu}>Login</Link>
          ) : (
            <p onClick={() => { handleLogout(); toggleMobileMenu(); }}>LOGOUT</p>
          )}
        </div>
      )}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <GarageLoading />
        </div>
      )}
    </nav>
  );
};

export default NavBar;
