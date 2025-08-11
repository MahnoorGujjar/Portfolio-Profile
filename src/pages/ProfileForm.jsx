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
    <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Create / Edit Profile</h2>
      <div className="space-y-3">
        <input value={form.name} onChange={e=>setForm({...form, name:e.target.value})} className="w-full p-2 border" placeholder="Name" />
        <input value={form.email} onChange={e=>setForm({...form, email:e.target.value})} className="w-full p-2 border" placeholder="Email" />
        <div>
          <div className="flex gap-2">
            <input value={skillInput} onChange={e=>setSkillInput(e.target.value)} className="p-2 border flex-1" placeholder="Add skill" />
            <button onClick={addSkill} className="px-3 py-1 bg-indigo-600 text-white rounded">Add</button>
          </div>
          <div className="mt-2 flex gap-2 flex-wrap">
            {form.skills.map((s,i)=> (
              <span key={i} className="px-2 py-1 bg-gray-200 rounded">
                {s} <button onClick={()=>removeSkill(i)} className="ml-2 text-red-600">x</button>
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="font-semibold">Projects</h3>
          <input placeholder="Title" value={proj.title} onChange={e=>setProj({...proj, title:e.target.value})} className="w-full p-2 border my-1" />
          <input placeholder="Link" value={proj.link} onChange={e=>setProj({...proj, link:e.target.value})} className="w-full p-2 border my-1" />
          <textarea placeholder="Description" value={proj.description} onChange={e=>setProj({...proj, description:e.target.value})} className="w-full p-2 border my-1" />
          <button onClick={addProject} className="px-3 py-1 bg-green-600 text-white rounded">Add project</button>

          <div className="mt-3">
            {form.projects.map((p,i)=>(
              <div key={i} className="border p-2 rounded mb-2">
                <div className="flex justify-between"><strong>{p.title}</strong><button onClick={()=>removeProject(i)} className="text-red-600">remove</button></div>
                <div>{p.description}</div>
                <a href={p.link} className="text-blue-600">{p.link}</a>
              </div>
            ))}
          </div>
        </div>

        <input value={form.github} onChange={e=>setForm({...form, github:e.target.value})} className="w-full p-2 border" placeholder="GitHub link" />

        <div className="flex gap-2">
          <button onClick={submit} className="px-4 py-2 bg-blue-600 text-white rounded">Save</button>
          <button onClick={()=>window.location.href='/profile/preview'} className="px-4 py-2 bg-gray-200 rounded">Preview</button>
        </div>
      </div>
    </div>
  );
}
