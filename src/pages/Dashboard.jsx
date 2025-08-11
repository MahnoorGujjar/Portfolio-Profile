import React, { useEffect, useState } from 'react';
import API_BASE, { getAuthToken, setAuthToken } from '../api';
import { Link } from 'react-router-dom';

export default function Dashboard(){
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

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
    <div>
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
      {profile ? (
        <div className="space-y-3">
          <div className="bg-white p-4 rounded shadow">
            <h3 className="text-xl">{profile.name || 'No name set'}</h3>
            <p>{profile.email}</p>
            <p>Skills: {(profile.skills||[]).join(', ')}</p>
            <div className="mt-2">
              <Link to="/profile/edit" className="mr-2 px-3 py-1 bg-yellow-400 rounded">Edit</Link>
              <Link to="/profile/preview" className="px-3 py-1 bg-green-500 text-white rounded">Preview</Link>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white p-4 rounded shadow">
          <p>You don't have a profile yet.</p>
          <Link to="/profile/edit" className="inline-block mt-2 px-3 py-1 bg-blue-600 text-white rounded">Create Profile</Link>
        </div>
      )}
    </div>
  );
}
