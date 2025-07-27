import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPopup, setShowPopup] = useState(false);
  const [failedPopup, setFailedPopup] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 1. Send login request
      const loginRes = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(form), // use form state
      });

      if (!loginRes.ok) {
        setFailedPopup(true);
        return;
      }

      // 2. Fetch user details (including role)
      const userRes = await fetch('http://localhost:3000/api/auth/me', {
        credentials: 'include',
      });

      const userData = await userRes.json();

      // 3. Store user info
      localStorage.setItem('user', JSON.stringify(userData));

      // 4. Show success popup and redirect
      setShowPopup(true);
      setTimeout(() => {
        if (userData.role === 'admin') {
          navigate('/updateStatus');
        } else {
          navigate('/');
        }
      }, 1000);

      setTimeout(() => {
        window.location.reload();
      }, 1000);

    } catch (err) {
      setFailedPopup(true);
    }
  };

  return (
    <div className='p-6 max-w-md mx-auto bg-white rounded-xl shadow mt-10'>
      <h2 className='text-2xl font-bold text-center mb-6'>Login</h2>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <input
          type="email"
          placeholder="Email"
          required
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full border px-3 py-2 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          required
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="w-full border px-3 py-2 rounded"
        />
        <button className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
          Login
        </button>
      </form>
      <p className='text-center text-sm mt-4'>
        Don't have an account?{' '}
        <Link to="/signup" className='text-blue-600 hover:underline'>
          Register here
        </Link>
      </p>

      {/* Success popup */}
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

      {/* Failed popup */}
      {failedPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-2xl text-center">
            <h2 className="text-xl font-semibold mb-2 text-red-600">Invalid Details!</h2>
            <p className="mb-4 text-gray-700 text-sm">Username or password is incorrect.</p>
            <button
              onClick={() => setFailedPopup(false)}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
