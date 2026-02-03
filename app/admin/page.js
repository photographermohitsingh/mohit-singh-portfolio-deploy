'use client';
import { useState, useEffect } from 'react';
import { CldUploadButton } from 'next-cloudinary';

export default function Admin() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({ title: '', category: 'Nature', imageUrl: '' });
  const [isEditing, setIsEditing] = useState(null); // Stores ID if editing

  // Fetch ALL projects (including inactive ones)
  const fetchProjects = async () => {
    const res = await fetch('/api/projects?admin=true');
    const data = await res.json();
    setProjects(data.data);
  };

  useEffect(() => { fetchProjects(); }, []);

  // Handle Create or Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = isEditing ? 'PUT' : 'POST';
    const body = isEditing ? { ...form, id: isEditing } : form;

    await fetch('/api/projects', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    setForm({ title: '', category: 'Nature', imageUrl: '' }); // Reset
    setIsEditing(null);
    fetchProjects(); // Refresh list
  };

  // Handle Delete
  const handleDelete = async (id) => {
    if(!confirm('Are you sure?')) return;
    await fetch('/api/projects', {
      method: 'DELETE',
      body: JSON.stringify({ id }),
    });
    fetchProjects();
  };

  // Handle Active/Inactive Toggle
  const toggleActive = async (project) => {
    await fetch('/api/projects', {
      method: 'PUT',
      body: JSON.stringify({ id: project._id, active: !project.active }),
    });
    fetchProjects();
  };

  const handleEdit = (project) => {
    setForm({ title: project.title, category: project.category, imageUrl: project.imageUrl });
    setIsEditing(project._id);
    window.scrollTo(0,0); // Scroll to top
  };

  return (
    <div className="min-h-screen bg-neutral-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Admin Dashboard</h1>

      {/* --- INPUT FORM --- */}
      <div className="max-w-xl mx-auto bg-black p-6 rounded-lg border border-neutral-800 mb-12">
        <h2 className="text-xl mb-4 font-bold text-yellow-500">{isEditing ? 'Edit Project' : 'Add New Project'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            placeholder="Title" 
            className="w-full p-2 bg-neutral-800 rounded" 
            value={form.title} 
            onChange={e => setForm({...form, title: e.target.value})} 
          />
          <select 
            className="w-full p-2 bg-neutral-800 rounded"
            value={form.category} 
            onChange={e => setForm({...form, category: e.target.value})}
          >
            <option>Nature</option>
            <option>Urban</option>
            <option>Portrait</option>
            <option>Models</option>
            <option>Weddings</option>
            <option>Other</option>
          </select>

          {/* Upload Button */}
          {!form.imageUrl ? (
            <CldUploadButton 
              uploadPreset="mohit_singh_portfolio" 
              onSuccess={(res) => setForm({...form, imageUrl: res.info.secure_url})}
              className="bg-neutral-700 w-full p-3 rounded"
            >
              Upload Image
            </CldUploadButton>
          ) : (
            <div className="text-center">
              <img src={form.imageUrl} className="h-20 mx-auto mb-2" />
              <button type="button" onClick={() => setForm({...form, imageUrl: ''})} className="text-red-500 text-sm">Change Image</button>
            </div>
          )}

          <button className="w-full bg-white text-black font-bold p-3 rounded">
            {isEditing ? 'Update Project' : 'Publish Project'}
          </button>
          
          {isEditing && (
            <button type="button" onClick={() => {setIsEditing(null); setForm({ title: '', category: 'Nature', imageUrl: '' })}} className="w-full text-neutral-500 text-sm mt-2">
              Cancel Edit
            </button>
          )}
        </form>
      </div>

      {/* --- MANAGEMENT TABLE --- */}
      <div className="max-w-4xl mx-auto">
        <h2 className="text-xl mb-4 font-bold border-b border-neutral-700 pb-2">All Projects ({projects.length})</h2>
        <div className="space-y-2">
          {projects.map((p) => (
            <div key={p._id} className="flex items-center justify-between bg-black p-4 rounded border border-neutral-800">
              <div className="flex items-center gap-4">
                <img src={p.imageUrl} className="w-12 h-12 object-cover rounded" />
                <div>
                  <h3 className="font-bold">{p.title}</h3>
                  <p className={`text-xs ${p.active ? 'text-green-500' : 'text-red-500'}`}>
                    {p.active ? '● Active' : '○ Hidden'}
                  </p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button onClick={() => toggleActive(p)} className="px-3 py-1 text-xs border border-neutral-600 rounded hover:bg-neutral-800">
                  {p.active ? 'Hide' : 'Show'}
                </button>
                <button onClick={() => handleEdit(p)} className="px-3 py-1 text-xs bg-blue-900 rounded hover:bg-blue-800">
                  Edit
                </button>
                <button onClick={() => handleDelete(p._id)} className="px-3 py-1 text-xs bg-red-900 rounded hover:bg-red-800">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}