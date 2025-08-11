import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { setAuthToken, getAuthToken } from '../api';

export default function Header(){
  const navigate = useNavigate();
  const token = getAuthToken();
  const logout = () => {
    setAuthToken(null);
    navigate('/login');
  }
  return (
    <header className="bg-gradient-to-r from-purple-500 to-blue-500 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/dashboard" className="flex items-center gap-3 text-white font-extrabold text-2xl tracking-tight">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M16 3v4M8 3v4"/></svg>
          <span>Portfolio Builder</span>
        </Link>
        <nav className="flex items-center gap-4">
          {token ? (
            <button onClick={logout} className="px-5 py-2 rounded-lg bg-red-500 text-white font-semibold shadow hover:bg-red-600 transition">Logout</button>
          ) : (
            <>
              <Link to="/login" className="px-4 py-2 rounded-lg bg-white text-purple-700 font-semibold shadow hover:bg-purple-100 transition">Login</Link>
              <Link to="/register" className="px-4 py-2 rounded-lg bg-white text-blue-700 font-semibold shadow hover:bg-blue-100 transition">Register</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
