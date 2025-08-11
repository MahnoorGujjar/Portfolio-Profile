import React, { useEffect, useState } from 'react';
import API_BASE, { getAuthToken, setAuthToken } from '../api';
import { Link } from 'react-router-dom';

export default function Dashboard(){
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
// add
  useEffect(()=>{
    const load = async () => {
      const token = getAuthToken();
      try {
        const res = await fetch(`${API_BASE}/profiles/me`, { headers: { Authorization: `Bearer ${token}` } });
        if (res.ok) {
          const data = await res.json();
          setProfile(data);
        } else if (res.status === 401) { setAuthToken(null); window.location.href = '/login'; }
      } catch (err) { console.error(err); }
      setLoading(false);
    }
    load();
  },[]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen flex bg-gradient-to-tr from-blue-50 to-purple-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg flex flex-col items-center py-10 rounded-r-3xl mr-8">
        <div className="mb-8">
          <svg className="w-16 h-16 text-purple-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 4-7 8-7s8 3 8 7"/></svg>
        </div>
        <nav className="flex flex-col gap-4 w-full px-6">
          <Link to="/dashboard" className="py-2 px-4 rounded-lg text-purple-700 font-semibold bg-purple-100 hover:bg-purple-200 transition">Dashboard</Link>
          <Link to="/profile/edit" className="py-2 px-4 rounded-lg text-blue-700 font-semibold bg-blue-100 hover:bg-blue-200 transition">Edit Profile</Link>
          <Link to="/profile/preview" className="py-2 px-4 rounded-lg text-green-700 font-semibold bg-green-100 hover:bg-green-200 transition">Preview Profile</Link>
        </nav>
      </aside>
      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center">
        <h2 className="text-4xl font-extrabold text-purple-700 mb-8 tracking-tight drop-shadow">Welcome to Your Dashboard</h2>
        {profile ? (
          <div className="bg-white rounded-3xl shadow-2xl p-10 flex flex-col items-center w-full max-w-xl border-t-8 border-purple-300">
            <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-purple-300 to-blue-200 flex items-center justify-center mb-6 shadow-lg">
              <span className="text-5xl text-white font-bold">{profile.name ? profile.name[0].toUpperCase() : '?'}</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">{profile.name || 'No name set'}</h3>
            <p className="text-gray-500 mb-4">{profile.email}</p>
            <div className="mb-4">
              <span className="inline-block bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">{(profile.skills||[]).length ? profile.skills.join(', ') : 'No skills listed'}</span>
            </div>
            <div className="flex gap-4 mt-4">
              <Link to="/profile/edit" className="px-5 py-2 bg-purple-500 text-white rounded-lg font-semibold shadow hover:bg-purple-600 transition">Edit Profile</Link>
              <Link to="/profile/preview" className="px-5 py-2 bg-green-500 text-white rounded-lg font-semibold shadow hover:bg-green-600 transition">Preview</Link>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-2xl p-10 flex flex-col items-center w-full max-w-xl border-t-8 border-blue-300">
            <svg className="w-20 h-20 text-blue-300 mb-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 4-7 8-7s8 3 8 7"/></svg>
            <p className="text-lg text-gray-600 mb-4">You don't have a profile yet.</p>
            <Link to="/profile/edit" className="px-6 py-2 bg-blue-500 text-white rounded-lg font-semibold shadow hover:bg-blue-600 transition">Create Profile</Link>
          </div>
        )}
      </main>
    </div>
  );
}
