import React, { useEffect, useState } from 'react';
import API_BASE, { getAuthToken } from '../api';

export default function ProfilePreview(){
  const [profile, setProfile] = useState(null);
  useEffect(()=>{
    const load = async () => {
      const token = getAuthToken();
      const res = await fetch(`${API_BASE}/profiles/me`, { headers:{ Authorization:`Bearer ${token}` } });
      if (res.ok) setProfile(await res.json());
    }
    load();
  },[]);

  if (!profile) return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-purple-50 to-blue-100">
      <div className="bg-white rounded-3xl shadow-2xl p-10 flex flex-col items-center w-full max-w-xl border-t-8 border-purple-300">
        <svg className="w-20 h-20 text-blue-300 mb-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 4-7 8-7s8 3 8 7"/></svg>
        <p className="text-lg text-gray-600 mb-4">No profile to preview</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-gradient-to-tr from-purple-50 to-blue-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg flex flex-col items-center py-10 rounded-r-3xl mr-8">
        <div className="mb-8">
          <svg className="w-16 h-16 text-purple-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 4-7 8-7s8 3 8 7"/></svg>
        </div>
        <nav className="flex flex-col gap-4 w-full px-6">
          <button onClick={()=>window.location.href='/dashboard'} className="py-2 px-4 rounded-lg text-purple-700 font-semibold bg-purple-100 hover:bg-purple-200 transition">Dashboard</button>
          <button onClick={()=>window.location.href='/profile/edit'} className="py-2 px-4 rounded-lg text-blue-700 font-semibold bg-blue-100 hover:bg-blue-200 transition">Edit Profile</button>
          <button onClick={()=>window.location.href='/profile/preview'} className="py-2 px-4 rounded-lg text-green-700 font-semibold bg-green-100 hover:bg-green-200 transition">Preview Profile</button>
        </nav>
      </aside>
      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center">
        <div className="bg-white rounded-3xl shadow-2xl p-10 flex flex-col items-center w-full max-w-2xl border-t-8 border-purple-300">
          <header className="mb-6 flex flex-col items-center">
            <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-purple-300 to-blue-200 flex items-center justify-center mb-4 shadow-lg">
              <span className="text-5xl text-white font-bold">{profile.name ? profile.name[0].toUpperCase() : '?'}</span>
            </div>
            <h1 className="text-3xl font-bold text-purple-700 mb-1">{profile.name}</h1>
            <p className="text-gray-500 mb-1">{profile.email}</p>
            <a href={profile.github} className="text-blue-600 underline">{profile.github}</a>
          </header>
          <section className="mb-6 w-full">
            <h2 className="font-semibold text-lg mb-2 text-purple-700">Skills</h2>
            <div className="flex gap-2 flex-wrap">{(profile.skills||[]).map((s,i)=>(<span key={i} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">{s}</span>))}</div>
          </section>
          <section className="w-full">
            <h2 className="font-semibold text-lg mb-2 text-purple-700">Projects</h2>
            {(profile.projects||[]).map((p,i)=>(
              <div key={i} className="border-2 border-purple-200 p-4 rounded-xl mb-2 bg-purple-50">
                <h3 className="font-bold text-purple-700">{p.title}</h3>
                <p className="text-gray-700">{p.description}</p>
                <a href={p.link} className="text-blue-600 underline">{p.link}</a>
              </div>
            ))}
          </section>
        </div>
      </main>
    </div>
  );
}
