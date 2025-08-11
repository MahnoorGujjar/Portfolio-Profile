import React, { useEffect, useState } from 'react';
import API_BASE, { getAuthToken } from '../api';
import { useNavigate } from 'react-router-dom';

export default function ProfileForm(){
  const [form, setForm] = useState({ name:'', email:'', skills:[], projects:[], github:'' });
  const [skillInput, setSkillInput] = useState('');
  const [proj, setProj] = useState({ title:'', description:'', link:'' });
  const token = getAuthToken();
  const navigate = useNavigate();

  useEffect(()=>{
    const load = async () => {
      const res = await fetch(`${API_BASE}/profiles/me`, { headers:{ Authorization:`Bearer ${token}` } });
      if (res.ok){ const data = await res.json(); setForm({
        name: data.name || '', email: data.email || '', skills: data.skills || [], projects: data.projects || [], github: data.github || ''
      })}
    }
    load();
  },[]);

  const addSkill = () => { if (skillInput.trim()){ setForm(f=>({...f, skills:[...f.skills, skillInput.trim()]})); setSkillInput(''); } }
  const removeSkill = idx => setForm(f=>({...f, skills: f.skills.filter((_,i)=>i!==idx)}));

  const addProject = () => { if (proj.title.trim()){ setForm(f=>({...f, projects:[...f.projects, proj]})); setProj({title:'',description:'',link:''}); } }
  const removeProject = idx => setForm(f=>({...f, projects: f.projects.filter((_,i)=>i!==idx)}));

  const submit = async () => {
    const res = await fetch(`${API_BASE}/profiles`, {
      method: 'POST', headers:{ 'Content-Type':'application/json', Authorization:`Bearer ${token}` },
      body: JSON.stringify(form)
    });
    if (res.ok) navigate('/dashboard');
    else alert('Failed to save');
  }

  return (
    <div className="min-h-screen flex bg-gradient-to-tr from-green-50 to-blue-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg flex flex-col items-center py-10 rounded-r-3xl mr-8">
        <div className="mb-8">
          <svg className="w-16 h-16 text-green-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 4-7 8-7s8 3 8 7"/></svg>
        </div>
        <nav className="flex flex-col gap-4 w-full px-6">
          <button onClick={()=>window.location.href='/dashboard'} className="py-2 px-4 rounded-lg text-green-700 font-semibold bg-green-100 hover:bg-green-200 transition">Dashboard</button>
          <button onClick={()=>window.location.href='/profile/edit'} className="py-2 px-4 rounded-lg text-blue-700 font-semibold bg-blue-100 hover:bg-blue-200 transition">Edit Profile</button>
          <button onClick={()=>window.location.href='/profile/preview'} className="py-2 px-4 rounded-lg text-purple-700 font-semibold bg-purple-100 hover:bg-purple-200 transition">Preview Profile</button>
        </nav>
      </aside>
      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center">
        <div className="bg-white rounded-3xl shadow-2xl p-10 flex flex-col items-center w-full max-w-2xl border-t-8 border-green-300">
          <h2 className="text-3xl font-extrabold text-green-700 mb-8 tracking-tight drop-shadow">Create / Edit Profile</h2>
          <div className="space-y-4 w-full">
            <input value={form.name} onChange={e=>setForm({...form, name:e.target.value})} className="w-full p-3 border-2 border-green-200 rounded-lg focus:border-green-400 outline-none" placeholder="Name" />
            <input value={form.email} onChange={e=>setForm({...form, email:e.target.value})} className="w-full p-3 border-2 border-green-200 rounded-lg focus:border-green-400 outline-none" placeholder="Email" />
            {/* Skills */}
            <div>
              <div className="flex gap-2">
                <input value={skillInput} onChange={e=>setSkillInput(e.target.value)} className="p-3 border-2 border-blue-200 rounded-lg flex-1 focus:border-blue-400 outline-none" placeholder="Add skill" />
                <button onClick={addSkill} className="px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold shadow hover:bg-blue-600 transition">Add</button>
              </div>
              <div className="mt-2 flex gap-2 flex-wrap">
                {form.skills.map((s,i)=> (
                  <span key={i} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium flex items-center">
                    {s} <button onClick={()=>removeSkill(i)} className="ml-2 text-red-600 font-bold">×</button>
                  </span>
                ))}
              </div>
            </div>
            {/* Projects */}
            <div>
              <h3 className="font-semibold text-lg mb-2">Projects</h3>
              <input placeholder="Title" value={proj.title} onChange={e=>setProj({...proj, title:e.target.value})} className="w-full p-3 border-2 border-purple-200 rounded-lg my-1 focus:border-purple-400 outline-none" />
              <input placeholder="Link" value={proj.link} onChange={e=>setProj({...proj, link:e.target.value})} className="w-full p-3 border-2 border-purple-200 rounded-lg my-1 focus:border-purple-400 outline-none" />
              <textarea placeholder="Description" value={proj.description} onChange={e=>setProj({...proj, description:e.target.value})} className="w-full p-3 border-2 border-purple-200 rounded-lg my-1 focus:border-purple-400 outline-none" />
              <button onClick={addProject} className="px-4 py-2 bg-purple-500 text-white rounded-lg font-semibold shadow hover:bg-purple-600 transition">Add project</button>
              <div className="mt-3">
                {form.projects.map((p,i)=>(
                  <div key={i} className="border-2 border-purple-200 p-4 rounded-xl mb-2 bg-purple-50">
                    <div className="flex justify-between items-center"><strong className="text-purple-700">{p.title}</strong><button onClick={()=>removeProject(i)} className="text-red-600 font-bold">remove</button></div>
                    <div className="text-gray-700">{p.description}</div>
                    <a href={p.link} className="text-blue-600 underline">{p.link}</a>
                  </div>
                ))}
              </div>
            </div>
            <input value={form.github} onChange={e=>setForm({...form, github:e.target.value})} className="w-full p-3 border-2 border-gray-200 rounded-lg focus:border-gray-400 outline-none" placeholder="GitHub link" />
            <div className="flex gap-4 mt-6 justify-center">
              <button onClick={submit} className="px-6 py-2 bg-green-500 text-white rounded-lg font-semibold shadow hover:bg-green-600 transition">Save</button>
              <button onClick={()=>window.location.href='/profile/preview'} className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold shadow hover:bg-gray-300 transition">Preview</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
