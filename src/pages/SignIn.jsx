// inside src/pages/SignIn.jsx (or your login page)
import { useState } from 'react';
import { useAtom } from 'jotai';
import { authAtom, userAtom } from '../atoms/authAtom';
import axiosInstance, { setAuthToken } from '../services/axiosInstance';
import { getUserInfoFromToken } from '../services/tokenUtils';
import { useNavigate } from 'react-router-dom';
import facebookIcon from '../assets/facebook-circle-svg.svg'
import googleIcon from '../assets/google-color-svg.svg'
import microsoftIcon from '../assets/microsoft-svg.svg'
import loginImage from '../assets/signin.png'

function SignIn() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [, setAuth] = useAtom(authAtom);
  const [, setUser] = useAtom(userAtom);
const navigate = useNavigate();

  // ... handleChange omitted ...
const handleChange = (e) => {
  const { name, value } = e.target;
  setForm((prev) => ({
    ...prev,
    [name]: value,
  }));
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const resp = await axiosInstance.post('/api/Account/Login', {
        email: form.email,
        password: form.password,
      });

      // defensive extraction: token may be resp.data.data or resp.data
      const token = resp?.data?.data ?? resp?.data;
      if (!token) {
        alert('Login succeeded but token not found in response.');
        return;
      }

      // 1) Save token (localStorage + axios header + jotai)
      setAuthToken(token);     // also writes to localStorage
      setAuth(token);          // update Jotai atom

      // 2) Decode token to extract username / email if present
      const info = getUserInfoFromToken(token);
      const username = info?.username ?? null;
      const email = info?.email ?? form.email ?? null;

      const userObj = { username, email };
      // persist and update atom
      try { localStorage.setItem('user', JSON.stringify(userObj)); } catch {}
      setUser(userObj);

      // optional: redirect to home/dashboard
      // navigate('/dashboard');

      alert('Login successful!');
      navigate('/');  
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.message ?? 'Login failed');
    }
  };

  return (
    <div className="flex min-h-[70vh] bg-white flex-col md:flex-row">
      {/* Left: Form */}
      <div className="flex w-full md:w-4/7 justify-center items-center p-6">
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <h2 className="text-2xl font-bold mb-14 text-center">Sign In</h2>

          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 mb-6 rounded"
            required
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            className="w-full border border-gray-300 p-3 mb-6 rounded"
            required
          />

          {/* Submit button */}
          <button
            type="submit"
            className="flex items-center justify-start bg-black text-white px-6 py-3 rounded hover:bg-gray-800 mt-4"
          >
            Sign In
            <i className="ri-arrow-right-line ml-2"></i>
          </button>

          {/* Separator */}
          <div className="flex items-center my-6">
            <hr className="flex-grow border-gray-300" />
            <span className="px-2 text-gray-500">sign in with</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* Social buttons */}
          <div className="flex justify-between">
            <button
              type="button"
              className="flex items-center border px-4 py-2 rounded hover:bg-gray-50"
            >
              <img src={facebookIcon} alt="fb" className="w-5 h-5 mr-2" />{" "}
              Facebook
            </button>
            <button
              type="button"
              className="flex items-center border px-4 py-2 rounded hover:bg-gray-50"
            >
              <img src={googleIcon} alt="google" className="w-5 h-5 mr-2" />{" "}
              Google
            </button>
            <button
              type="button"
              className="flex items-center border px-4 py-2 rounded hover:bg-gray-50"
            >
              <img src={microsoftIcon} alt="ms" className="w-5 h-5 mr-2" />{" "}
              Microsoft
            </button>
          </div>
        </form>
      </div>

      {/* Right: Image */}
      <div className="hidden md:flex w-full md:w-3/7 bg-gray-100 items-center justify-center">
        <img
          src={loginImage}
          alt="Login"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

export default SignIn;
