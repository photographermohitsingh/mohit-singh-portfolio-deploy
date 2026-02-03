'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch('/api/projects')
      .then((res) => res.json())
      .then((data) => setProjects(data.data));
  }, []);

  return (
    <main className="min-h-screen bg-neutral-900 text-white font-sans">
      {/* HEADER */}
      {/* <nav className="p-8 flex justify-between items-center uppercase tracking-widest border-b border-neutral-800">
        <h1 className="text-2xl font-bold">Mohit Singh</h1>
        <div className="space-x-6 text-sm text-neutral-400">
          <a href="#" className="hover:text-white transition">Work</a>
          <a href="#" className="hover:text-white transition">Presets</a>
          <a href="/admin" className="hover:text-white transition">Admin</a>
        </div>
      </nav> */}

      {/* HERO SECTION */}
      <section className="h-[60vh] flex items-center justify-center bg-[url('https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=2070')] bg-cover bg-center">
        <div className="bg-black/50 p-4 w-full h-full flex items-center justify-center">
          <h2 className="text-5xl font-black tracking-tighter text-center">
            CAPTURE <span className="text-neutral-500">EVERYTHING.</span>
          </h2>
        </div>
      </section>

      {/* MASONRY GRID */}
      <section className="p-4 md:p-8">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
          {projects.map((project) => (
            <div key={project._id} className="relative group overflow-hidden break-inside-avoid">
              <img 
                src={project.imageUrl} 
                alt={project.title} 
                className="w-full rounded-sm transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <p className="text-xs text-yellow-500 tracking-widest uppercase">{project.category}</p>
                <h3 className="text-xl font-bold">{project.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}