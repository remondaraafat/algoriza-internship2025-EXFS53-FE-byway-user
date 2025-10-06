import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAtom } from 'jotai';
import { authAtom, userAtom } from '../atoms/authAtom';
import { getUserInfoFromToken } from '../utils/jwtUtils';
import { setAuthToken } from '../services/axiosInstance';
import Logo from '/src/assets/logo.png';

function Nav() {
  const [auth, setAuth] = useAtom(authAtom);
  const [user, setUser] = useAtom(userAtom);
  const navigate = useNavigate();

  // --- Sync user from token/localStorage on mount ---
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && !auth) {
      setAuth(token);
      setAuthToken(token);
      const info = getUserInfoFromToken(token);
      const userObj = {
        username: info?.unique_name ?? info?.username ?? null,
        email: info?.email ?? null,
      };
      setUser(userObj);
      localStorage.setItem('user', JSON.stringify(userObj));
    }
  }, []);

  // --- Handle logout ---
  const handleLogout = () => {
    setAuthToken(null); // remove from axios headers
    setAuth(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/signin');
  };

  // --- Compute avatar letter ---
  let avatarLetter = 'U';
  if (user?.username) {
    avatarLetter = user.username.charAt(0).toUpperCase();
  } else if (user?.email) {
    avatarLetter = user.email.charAt(0).toUpperCase();
  } else {
    const token = localStorage.getItem('token');
    if (token) {
      const info = getUserInfoFromToken(token);
      const candidate = info?.unique_name ?? info?.username ?? info?.email ?? null;
      if (candidate) avatarLetter = candidate.charAt(0).toUpperCase();
    }
  }

  return (
    <nav className="bg-white border-b border-gray-300 px-6 py-3 flex items-center fixed top-0 left-0 right-0 z-20 shadow-sm">
      {/* Logo */}
      <div className="mr-6 flex-shrink-0">
        <img src={Logo} alt="Logo" className="h-10 w-auto" />
      </div>

      {/* Search bar */}
      <div className="hidden md:flex items-center border border-gray-300 rounded-md px-3 py-2 mr-6 flex-1 max-w-md">
        <i className="fa-solid fa-magnifying-glass text-[#334155] mr-2 text-sm"></i>
        <input
          type="text"
          placeholder="Search"
          className="outline-none flex-1 text-sm text-[#334155] placeholder-[#334155] font-medium"
        />
      </div>

      {/* Courses button */}
      <button className="hidden md:block rounded-md px-4 py-2 text-sm text-[#334155] font-semibold hover:bg-gray-100 mr-6">
        Courses
      </button>

      {/* Right side (auth buttons or user icons) */}
      <div className="ml-auto flex items-center space-x-4">
        {!auth ? (
          <>
            <Link
              to="/signin"
              className="bg-white border border-[#334155] text-[#334155] rounded-md px-4 py-2 text-sm hover:bg-gray-50 font-semibold"
            >
              LogIn
            </Link>
            <Link
              to="/signup"
              className="bg-[#334155] text-white rounded-md px-4 py-2 text-sm hover:bg-[#1f2937] font-semibold"
            >
              SignUp
            </Link>
          </>
        ) : (
          <>
            <button
              className="text-[#334155] hover:text-black text-lg"
              title="Cart"
            >
              <i className="ri-shopping-cart-2-line"></i>
            </button>

            <button
              onClick={handleLogout}
              className="text-[#334155] hover:text-red-500 text-lg"
              title="Logout"
            >
              <i className="ri-logout-circle-line"></i>
            </button>

            <div
              className="w-9 h-9 bg-[#334155] text-white rounded-full flex items-center justify-center text-sm font-bold"
              title={user?.username || user?.email || 'User'}
            >
              {avatarLetter}
            </div>
          </>
        )}
      </div>
    </nav>
  );
}

export default Nav;
