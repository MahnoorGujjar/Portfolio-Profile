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

  if (!profile) return <div>No profile to preview</div>;

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
      <header className="mb-4">
        <h1 className="text-3xl font-bold">{profile.name}</h1>
        <p className="text-sm">{profile.email}</p>
        <a href={profile.github} className="text-blue-600">{profile.github}</a>
      </header>
      <section className="mb-4">
        <h2 className="font-semibold">Skills</h2>
        <div className="flex gap-2 flex-wrap">{(profile.skills||[]).map((s,i)=>(<span key={i} className="px-2 py-1 bg-gray-100 rounded">{s}</span>))}</div>
      </section>
      <section>
        <h2 className="font-semibold">Projects</h2>
        {(profile.projects||[]).map((p,i)=>(
          <div key={i} className="border p-3 rounded mb-2">
            <h3 className="font-bold">{p.title}</h3>
            <p>{p.description}</p>
            <a href={p.link} className="text-blue-600">{p.link}</a>
          </div>
        ))}
      </section>
    </div>
  );
}
