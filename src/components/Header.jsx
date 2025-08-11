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
    <header className="bg-white shadow">
      <div className="container mx-auto p-4 flex justify-between">
        <Link to="/dashboard" className="font-bold">Portfolio Builder</Link>
        <div>
          {token ? (
            <button onClick={logout} className="px-3 py-1 rounded bg-red-500 text-white">Logout</button>
          ) : (
            <>
              <Link to="/login" className="mr-2">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}
