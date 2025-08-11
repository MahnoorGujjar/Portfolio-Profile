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
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Login</h2>
      {msg && <div className="mb-2 text-red-600">{msg}</div>}
      <form onSubmit={submit}>
        <input className="w-full p-2 mb-2 border" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input type="password" className="w-full p-2 mb-2 border" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button className="w-full py-2 bg-blue-600 text-white rounded">Login</button>
      </form>
    </div>
  );
}
