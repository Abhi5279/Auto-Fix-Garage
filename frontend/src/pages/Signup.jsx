import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import GarageLoading from '../components/GarageLoading';

const Signup = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [showErrorPopup, setShowErrorPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });


      const data = await res.json();

      if (res.ok) {
        setShowPopup(true);
        navigate('/login');
      } else {
        setShowErrorPopup(true);
        setErrorMessage('User alredy exists!')
      }
    } catch (error) {
      console.error('Signup error:', error);
      setShowErrorPopup(true);
      setErrorMessage('Server error. Try again later.')
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='p-6 max-w-md mx-auto bg-white rounded-xl shadow mt-10'>
      <h2 className='text-2xl font-bold text-center mb-6'>Register</h2>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <input
          type="text"
          placeholder="Full Name"
          required
          className="w-full border px-3 py-2 rounded"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          required
          className="w-full border px-3 py-2 rounded"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          required
          className="w-full border px-3 py-2 rounded"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button className="w-full bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">
          Sign Up
        </button>
      </form>
      <p className='text-center text-sm mt-4'>
        Already have an account? <Link to="/login" className='text-blue-600 hover:underline'>Login here</Link>
      </p>
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-2xl text-center">
            <h2 className="text-xl font-semibold mb-2 text-green-600">Logged in Successfully!</h2>
            <button
              onClick={() => setShowPopup(false)}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
      {showErrorPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-2xl text-center">
            <h2 className="text-xl font-semibold mb-2 text-red-600">{errorMessage}</h2>
            <button
              onClick={() => setShowErrorPopup(false)}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
              Close
            </button>
          </div>
        </div>
      )}
      {loading && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <GarageLoading />
        </div>
      )}
    </div>

  );
};

export default Signup;
