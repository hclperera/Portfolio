"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { Lock, Save, Plus, Trash2, LayoutDashboard, Briefcase, Award, Code2, User } from "lucide-react";
import { verifyPassword } from "./actions";

export default function AdminPanel() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  
  const [activeTab, setActiveTab] = useState("profile");
  
  const [projects, setProjects] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [skills, setSkills] = useState([]);
  const [profile, setProfile] = useState({ id: 1, about_texts: [], profile_picture_url: "", cv_url: "" });
  
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    const response = await verifyPassword(password);
    if (response.success) {
      setIsAuthenticated(true);
      setError("");
      fetchAllData();
    } else {
      setError(response.message);
    }
  };

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [projRes, certRes, skillRes, profRes] = await Promise.all([
        supabase.from("projects").select("*").order("id", { ascending: true }),
        supabase.from("certifications").select("*").order("id", { ascending: true }),
        supabase.from("skills").select("*").order("id", { ascending: true }),
        supabase.from("profile").select("*").eq("id", 1).single()
      ]);
      
      if (projRes.data) setProjects(projRes.data);
      if (certRes.data) setCertifications(certRes.data);
      if (skillRes.data) setSkills(skillRes.data);
      if (profRes.data) setProfile(profRes.data);
    } catch (err) {
      console.log("Error fetching data, check tables.");
    }
    setLoading(false);
  };

  const handleSave = async (table, data) => {
    try {
      const { error } = await supabase.from(table).upsert(data);
      if (error) throw error;
      alert("Saved successfully!");
      fetchAllData();
    } catch (err) {
      alert("Failed to save. Ensure table exists.");
      console.error(err);
    }
  };

  const handleDelete = async (table, id) => {
    if (!confirm("Are you sure you want to delete this?")) return;
    try {
      const { error } = await supabase.from(table).delete().eq("id", id);
      if (error) throw error;
      fetchAllData();
    } catch (err) {
      alert("Failed to delete.");
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
        </form>
      </div>
    );
  }

  const TABS = [
    { id: "profile", label: "Profile / About", icon: <User className="w-4 h-4" /> },
    { id: "projects", label: "Projects", icon: <Briefcase className="w-4 h-4" /> },
    { id: "certifications", label: "Certifications", icon: <Award className="w-4 h-4" /> },
    { id: "skills", label: "Tech Stack", icon: <Code2 className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-[#050505] font-sans p-8 flex flex-col md:flex-row gap-8">
      {/* Sidebar */}
      <div className="w-full md:w-64 shrink-0">
        <h1 className="text-2xl font-bold font-mono mb-8"><span className="text-accent">~/</span>admin</h1>
        <div className="flex flex-col gap-2">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors text-sm font-mono ${activeTab === tab.id ? "bg-accent/10 text-accent border border-accent/20" : "text-foreground/70 hover:bg-border/50 hover:text-foreground border border-transparent"}`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>
        <button onClick={() => setIsAuthenticated(false)} className="mt-8 w-full px-4 py-2 border border-border hover:border-red-500/50 rounded-sm transition-colors text-sm font-mono text-foreground/50 hover:text-red-500">
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 max-w-5xl">
        {loading ? (
          <div className="text-accent font-mono animate-pulse">Loading data...</div>
        ) : (
          <div className="bg-background border border-border rounded-lg p-6 min-h-[500px]">
            {activeTab === "profile" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold mb-6">Profile & About Me</h2>
                
                <div>
                  <label className="block text-xs font-mono text-foreground/50 mb-1">Profile Picture URL</label>
                  <input 
                    type="text" 
                    value={profile?.profile_picture_url || ''}
                    onChange={(e) => setProfile({...profile, profile_picture_url: e.target.value})}
                    className="w-full bg-[#0a0a0a] border border-border p-2 rounded-sm text-foreground focus:border-accent focus:outline-none"
                    placeholder="/profile.png or https://..."
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-mono text-foreground/50 mb-1">CV / Resume URL</label>
                  <input 
                    type="text" 
                    value={profile?.cv_url || ''}
                    onChange={(e) => setProfile({...profile, cv_url: e.target.value})}
                    className="w-full bg-[#0a0a0a] border border-border p-2 rounded-sm text-foreground focus:border-accent focus:outline-none"
                    placeholder="/Chanduka_Lakshan.pdf or https://..."
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-mono text-foreground/50 mb-1">About Me Paragraphs (Education, Background)</label>
                  <div className="space-y-3">
                    {(profile?.about_texts || []).map((text, idx) => (
                      <div key={idx} className="flex gap-2">
                        <textarea 
                          value={text}
                          onChange={(e) => {
                            const newTexts = [...(profile.about_texts || [])];
                            newTexts[idx] = e.target.value;
                            setProfile({...profile, about_texts: newTexts});
                          }}
                          className="w-full bg-[#0a0a0a] border border-border p-2 rounded-sm text-foreground focus:border-accent focus:outline-none h-20"
                        />
                        <button onClick={() => {
                          const newTexts = profile.about_texts.filter((_, i) => i !== idx);
                          setProfile({...profile, about_texts: newTexts});
                        }} className="p-2 border border-red-500/50 text-red-500 rounded hover:bg-red-500/10 shrink-0">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                    <button onClick={() => {
                      setProfile({...profile, about_texts: [...(profile?.about_texts || []), ""]});
                    }} className="text-xs font-mono text-accent hover:underline flex items-center gap-1">
                      <Plus className="w-3 h-3" /> Add Paragraph
                    </button>
                  </div>
                </div>

                <button onClick={() => handleSave("profile", { ...profile, id: 1 })} className="bg-foreground text-background px-6 py-2 rounded-sm hover:bg-foreground/90 font-bold flex items-center gap-2">
                  <Save className="w-4 h-4" /> Save Profile
                </button>
              </div>
            )}

            {activeTab === "projects" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Projects</h2>
                  <button onClick={() => setProjects([{ id: Date.now(), title: "", description: "", tech_stack: [], github_link: "", live_link: "", image_url: "" }, ...projects])} className="flex items-center gap-1 bg-accent text-accent-foreground px-3 py-1.5 rounded-sm font-bold text-sm">
                    <Plus className="w-4 h-4" /> Add
                  </button>
                </div>
                <div className="grid gap-6">
                  {projects.map((project, index) => (
                    <div key={project.id} className="border border-border p-4 rounded-lg space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-mono text-foreground/50 mb-1">Title</label>
                          <input type="text" value={project.title} onChange={(e) => { const newP = [...projects]; newP[index].title = e.target.value; setProjects(newP); }} className="w-full bg-[#0a0a0a] border border-border p-2 rounded-sm text-foreground focus:border-accent focus:outline-none" />
                        </div>
                        <div>
                          <label className="block text-xs font-mono text-foreground/50 mb-1">Image URL</label>
                          <input type="text" value={project.image_url || ''} onChange={(e) => { const newP = [...projects]; newP[index].image_url = e.target.value; setProjects(newP); }} className="w-full bg-[#0a0a0a] border border-border p-2 rounded-sm text-foreground focus:border-accent focus:outline-none" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-foreground/50 mb-1">Description</label>
                        <textarea value={project.description} onChange={(e) => { const newP = [...projects]; newP[index].description = e.target.value; setProjects(newP); }} className="w-full bg-[#0a0a0a] border border-border p-2 rounded-sm text-foreground h-20 focus:border-accent focus:outline-none" />
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-mono text-foreground/50 mb-1">GitHub Link (Primary)</label>
                          <input type="text" value={project.github_link || ''} onChange={(e) => { const newP = [...projects]; newP[index].github_link = e.target.value; setProjects(newP); }} className="w-full bg-[#0a0a0a] border border-border p-2 rounded-sm text-foreground focus:border-accent focus:outline-none" />
                        </div>
                        <div>
                          <label className="block text-xs font-mono text-foreground/50 mb-1">Live Link</label>
                          <input type="text" value={project.live_link || ''} onChange={(e) => { const newP = [...projects]; newP[index].live_link = e.target.value; setProjects(newP); }} className="w-full bg-[#0a0a0a] border border-border p-2 rounded-sm text-foreground focus:border-accent focus:outline-none" />
                        </div>
                      </div>
                      <div>
                        <label className="block text-xs font-mono text-foreground/50 mb-1">Tech Stack (comma separated)</label>
                        <input type="text" value={project.tech_stack?.join(', ') || ''} onChange={(e) => { const newP = [...projects]; newP[index].tech_stack = e.target.value.split(',').map(s=>s.trim()).filter(Boolean); setProjects(newP); }} className="w-full bg-[#0a0a0a] border border-border p-2 rounded-sm text-foreground focus:border-accent focus:outline-none" />
                      </div>
                      <div className="flex justify-end gap-2 pt-2 border-t border-border">
                        <button onClick={() => handleDelete("projects", project.id)} className="px-3 py-1 border border-red-500/50 text-red-500 rounded text-sm hover:bg-red-500/10">Delete</button>
                        <button onClick={() => handleSave("projects", project)} className="px-4 py-1 bg-foreground text-background rounded font-bold text-sm hover:bg-foreground/90">Save</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "certifications" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Certifications</h2>
                  <button onClick={() => setCertifications([{ id: Date.now(), title: "", issuer: "", date: "", credential_url: "", image_url: "" }, ...certifications])} className="flex items-center gap-1 bg-accent text-accent-foreground px-3 py-1.5 rounded-sm font-bold text-sm">
                    <Plus className="w-4 h-4" /> Add
                  </button>
                </div>
                <div className="grid gap-6">
                  {certifications.map((cert, index) => (
                    <div key={cert.id} className="border border-border p-4 rounded-lg space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-mono text-foreground/50 mb-1">Title</label>
                          <input type="text" value={cert.title} onChange={(e) => { const newC = [...certifications]; newC[index].title = e.target.value; setCertifications(newC); }} className="w-full bg-[#0a0a0a] border border-border p-2 rounded-sm text-foreground focus:border-accent focus:outline-none" />
                        </div>
                        <div>
                          <label className="block text-xs font-mono text-foreground/50 mb-1">Issuer</label>
                          <input type="text" value={cert.issuer} onChange={(e) => { const newC = [...certifications]; newC[index].issuer = e.target.value; setCertifications(newC); }} className="w-full bg-[#0a0a0a] border border-border p-2 rounded-sm text-foreground focus:border-accent focus:outline-none" />
                        </div>
                        <div>
                          <label className="block text-xs font-mono text-foreground/50 mb-1">Date</label>
                          <input type="text" value={cert.date} onChange={(e) => { const newC = [...certifications]; newC[index].date = e.target.value; setCertifications(newC); }} className="w-full bg-[#0a0a0a] border border-border p-2 rounded-sm text-foreground focus:border-accent focus:outline-none" />
                        </div>
                        <div>
                          <label className="block text-xs font-mono text-foreground/50 mb-1">Credential URL</label>
                          <input type="text" value={cert.credential_url || ''} onChange={(e) => { const newC = [...certifications]; newC[index].credential_url = e.target.value; setCertifications(newC); }} className="w-full bg-[#0a0a0a] border border-border p-2 rounded-sm text-foreground focus:border-accent focus:outline-none" />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-xs font-mono text-foreground/50 mb-1">Image URL</label>
                          <input type="text" value={cert.image_url || ''} onChange={(e) => { const newC = [...certifications]; newC[index].image_url = e.target.value; setCertifications(newC); }} className="w-full bg-[#0a0a0a] border border-border p-2 rounded-sm text-foreground focus:border-accent focus:outline-none" />
                        </div>
                      </div>
                      <div className="flex justify-end gap-2 pt-2 border-t border-border">
                        <button onClick={() => handleDelete("certifications", cert.id)} className="px-3 py-1 border border-red-500/50 text-red-500 rounded text-sm hover:bg-red-500/10">Delete</button>
                        <button onClick={() => handleSave("certifications", cert)} className="px-4 py-1 bg-foreground text-background rounded font-bold text-sm hover:bg-foreground/90">Save</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "skills" && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">Tech Stack Categories</h2>
                  <button onClick={() => setSkills([{ id: Date.now(), category: "New Category", icon_name: "Server", items: [] }, ...skills])} className="flex items-center gap-1 bg-accent text-accent-foreground px-3 py-1.5 rounded-sm font-bold text-sm">
                    <Plus className="w-4 h-4" /> Add
                  </button>
                </div>
                <div className="grid gap-6">
                  {skills.map((skill, index) => (
                    <div key={skill.id} className="border border-border p-4 rounded-lg space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-mono text-foreground/50 mb-1">Category Name</label>
                          <input type="text" value={skill.category} onChange={(e) => { const newS = [...skills]; newS[index].category = e.target.value; setSkills(newS); }} className="w-full bg-[#0a0a0a] border border-border p-2 rounded-sm text-foreground focus:border-accent focus:outline-none" />
                        </div>
                        <div>
                          <label className="block text-xs font-mono text-foreground/50 mb-1">Icon Name (lucide-react)</label>
                          <input type="text" value={skill.icon_name} onChange={(e) => { const newS = [...skills]; newS[index].icon_name = e.target.value; setSkills(newS); }} className="w-full bg-[#0a0a0a] border border-border p-2 rounded-sm text-foreground focus:border-accent focus:outline-none" />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-xs font-mono text-foreground/50 mb-1">Skills (comma separated)</label>
                          <input type="text" value={skill.items?.join(', ') || ''} onChange={(e) => { const newS = [...skills]; newS[index].items = e.target.value.split(',').map(s=>s.trim()).filter(Boolean); setSkills(newS); }} className="w-full bg-[#0a0a0a] border border-border p-2 rounded-sm text-foreground focus:border-accent focus:outline-none" />
                        </div>
                      </div>
                      <div className="flex justify-end gap-2 pt-2 border-t border-border">
                        <button onClick={() => handleDelete("skills", skill.id)} className="px-3 py-1 border border-red-500/50 text-red-500 rounded text-sm hover:bg-red-500/10">Delete</button>
                        <button onClick={() => handleSave("skills", skill)} className="px-4 py-1 bg-foreground text-background rounded font-bold text-sm hover:bg-foreground/90">Save</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
