"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Lock, Save, Plus, Trash2 } from "lucide-react";

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Authentication check (basic)
  const handleLogin = (e) => {
    e.preventDefault();
    // For a real app, this should be a secure server-side check.
    // We use a simple env variable or a hardcoded fallback for demonstration.
    const CORRECT_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "admin123";
    
    if (password === CORRECT_PASSWORD) {
      setIsAuthenticated(true);
      setError("");
      fetchProjects();
    } else {
      setError("Incorrect password");
    }
  };

  const fetchProjects = async () => {
    setLoading(true);
    // Try fetching from Supabase
    const { data, error } = await supabase.from("projects").select("*").order("id", { ascending: true });
    
    if (error) {
      console.error("Error fetching projects:", error);
      // Since DB might not be set up yet, fallback to empty array
      setProjects([]);
    } else {
      setProjects(data || []);
    }
    setLoading(false);
  };

  const handleUpdateProject = async (id, field, value) => {
    const updatedProjects = projects.map(p => p.id === id ? { ...p, [field]: value } : p);
    setProjects(updatedProjects);
  };

  const handleSaveProject = async (project) => {
    try {
      const { error } = await supabase
        .from("projects")
        .upsert(project);
      
      if (error) throw error;
      alert("Project saved successfully!");
    } catch (err) {
      alert("Failed to save project. Ensure Supabase is configured correctly.");
      console.error(err);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#050505] font-mono">
        <form onSubmit={handleLogin} className="bg-background border border-border p-8 rounded-lg max-w-sm w-full">
          <div className="flex justify-center mb-6 text-accent">
            <Lock className="w-12 h-12" />
          </div>
          <h1 className="text-xl font-bold text-center mb-6 text-foreground">Admin Access Required</h1>
          
          <input
            type="password"
            placeholder="Enter password..."
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-[#0a0a0a] border border-border p-3 rounded-sm mb-4 text-foreground focus:outline-none focus:border-accent transition-colors"
          />
          
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          
          <button type="submit" className="w-full bg-accent text-accent-foreground font-bold p-3 rounded-sm hover:bg-accent/90 transition-colors">
            Login
          </button>
          
          <p className="text-foreground/40 text-xs text-center mt-6">
            Default password is 'admin123' if ENV not set.
          </p>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] font-sans p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-12 border-b border-border pb-6">
          <div>
            <h1 className="text-3xl font-bold font-mono"><span className="text-accent">~/</span>admin</h1>
            <p className="text-foreground/60 mt-2">Manage your portfolio content.</p>
          </div>
          <button onClick={() => setIsAuthenticated(false)} className="px-4 py-2 border border-border hover:border-accent rounded-sm transition-colors text-sm font-mono">
            Logout
          </button>
        </header>

        <section>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Projects</h2>
            <button className="flex items-center gap-2 bg-accent text-accent-foreground px-4 py-2 rounded-sm font-bold hover:bg-accent/90 transition-colors text-sm">
              <Plus className="w-4 h-4" /> Add New
            </button>
          </div>

          {loading ? (
            <div className="text-accent font-mono animate-pulse">Loading data...</div>
          ) : (
            <div className="grid gap-6">
              {projects.length === 0 ? (
                <div className="p-8 border border-border border-dashed text-center text-foreground/50 rounded-lg">
                  No projects found. Please ensure Supabase is connected and the "projects" table exists.
                </div>
              ) : (
                projects.map((project) => (
                  <div key={project.id} className="bg-background border border-border p-6 rounded-lg flex flex-col md:flex-row gap-6">
                    <div className="flex-1 space-y-4">
                      <div>
                        <label className="block text-xs font-mono text-foreground/50 mb-1">Title</label>
                        <input 
                          type="text" 
                          value={project.title}
                          onChange={(e) => handleUpdateProject(project.id, 'title', e.target.value)}
                          className="w-full bg-[#0a0a0a] border border-border p-2 rounded-sm text-foreground focus:border-accent focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-foreground/50 mb-1">Description</label>
                        <textarea 
                          value={project.description}
                          onChange={(e) => handleUpdateProject(project.id, 'description', e.target.value)}
                          className="w-full bg-[#0a0a0a] border border-border p-2 rounded-sm text-foreground focus:border-accent focus:outline-none h-24"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-mono text-foreground/50 mb-1">GitHub Link</label>
                          <input 
                            type="text" 
                            value={project.github_link || ''}
                            onChange={(e) => handleUpdateProject(project.id, 'github_link', e.target.value)}
                            className="w-full bg-[#0a0a0a] border border-border p-2 rounded-sm text-foreground focus:border-accent focus:outline-none"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-mono text-foreground/50 mb-1">Live Link</label>
                          <input 
                            type="text" 
                            value={project.live_link || ''}
                            onChange={(e) => handleUpdateProject(project.id, 'live_link', e.target.value)}
                            className="w-full bg-[#0a0a0a] border border-border p-2 rounded-sm text-foreground focus:border-accent focus:outline-none"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col gap-3 justify-start md:w-32 border-t md:border-t-0 md:border-l border-border pt-4 md:pt-0 md:pl-6">
                      <button 
                        onClick={() => handleSaveProject(project)}
                        className="flex items-center justify-center gap-2 bg-foreground text-background px-4 py-2 rounded-sm hover:bg-foreground/90 transition-colors w-full"
                      >
                        <Save className="w-4 h-4" /> Save
                      </button>
                      <button className="flex items-center justify-center gap-2 border border-red-500/50 text-red-500 px-4 py-2 rounded-sm hover:bg-red-500/10 transition-colors w-full">
                        <Trash2 className="w-4 h-4" /> Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
