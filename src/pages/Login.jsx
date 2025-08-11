import React, { useState } from 'react';
import API_BASE, { setAuthToken } from '../api';

export default function Login(){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
// add
  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_BASE}/auth/login`, {
        method: 'POST', headers:{ 'Content-Type':'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (res.ok) { setAuthToken(data.token); window.location.href = '/dashboard'; }
      else setMsg(data.message || 'Error');
    } catch (err) { setMsg('Network error'); }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-blue-50 to-purple-100">
      <div className="bg-white rounded-3xl shadow-2xl p-10 flex flex-col items-center w-full max-w-md border-t-8 border-purple-300">
        <h2 className="text-3xl font-extrabold text-purple-700 mb-8 tracking-tight drop-shadow">Login</h2>
        {msg && <div className="mb-4 text-red-600 font-semibold">{msg}</div>}
        <form onSubmit={submit} className="w-full flex flex-col gap-4">
          <input className="w-full p-3 border-2 border-purple-200 rounded-lg focus:border-purple-400 outline-none" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
          <input type="password" className="w-full p-3 border-2 border-purple-200 rounded-lg focus:border-purple-400 outline-none" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
          <button className="w-full py-3 bg-purple-500 text-white rounded-lg font-semibold shadow hover:bg-purple-600 transition">Login</button>
        </form>
      </div>
    </div>
  );
}
