"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/utils/supabase";
import { blogPosts as staticPosts } from "../posts/data";
import Link from "next/link";

export default function DiscoursesAdmin() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({ title: "", slug: "", excerpt: "", content: "" });
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data?.user || null);
      setLoading(false);
    });
    fetchPosts();
  }, []);

  async function fetchPosts() {
    const { data, error } = await supabase
      .from("blog_posts")
      // include content and updated_at so the edit form can be populated
      .select("id, title, slug, excerpt, content, created_at, updated_at")
      .order("created_at", { ascending: false });
    if (!error) setPosts(data);
  }

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    const email = e.target.email.value;
    const password = e.target.password.value;
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) setError(error.message);
    else {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    setUser(null);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    if (!form.title || !form.slug || !form.content) {
      setError("Title, slug, and content are required.");
      return;
    }
    if (editingId) {
      const { error } = await supabase
        .from("blog_posts")
        .update({ ...form, updated_at: new Date() })
        .eq("id", editingId);
      if (error) setError(error.message);
      else {
        setEditingId(null);
        setForm({ title: "", slug: "", excerpt: "", content: "" });
        fetchPosts();
      }
    } else {
      const { error } = await supabase.from("blog_posts").insert([{ ...form }]);
      if (error) setError(error.message);
      else {
        setForm({ title: "", slug: "", excerpt: "", content: "" });
        fetchPosts();
      }
    }
  }

  function handleEdit(post) {
    setEditingId(post.id);
    setForm({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt || "",
      content: post.content || "",
    });
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this post?")) return;
    await supabase.from("blog_posts").delete().eq("id", id);
    fetchPosts();
  }

  async function importStaticPosts() {
    setStatusMessage("");
    if (!window.confirm("Import bundled posts into Supabase? This will skip posts with matching slugs.")) return;
    try {
      // fetch existing slugs
      const { data: existing, error: err } = await supabase.from("blog_posts").select("slug");
      if (err) throw err;
      const existingSlugs = new Set((existing || []).map((r) => r.slug));
      const toInsert = staticPosts.filter((p) => !existingSlugs.has(p.slug)).map((p) => ({
        title: p.title,
        slug: p.slug,
        excerpt: p.excerpt || "",
        content: p.content || "",
        created_at: p.date ? new Date(p.date).toISOString() : undefined,
      }));
      if (toInsert.length === 0) {
        setStatusMessage("No bundled posts to import (all slugs already exist).");
        return;
      }
      const { error: insertErr } = await supabase.from("blog_posts").insert(toInsert);
      if (insertErr) throw insertErr;
      setStatusMessage(`Imported ${toInsert.length} post(s).`);
      fetchPosts();
    } catch (e) {
      console.error(e);
      setStatusMessage("Import failed: " + (e.message || e.toString()));
    }
  }

  if (loading) return <div className="text-white p-8">Loading...</div>;

  if (!user) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-black text-white">
        <form onSubmit={handleLogin} className="bg-gray-900 p-8 rounded-lg shadow-lg border border-gray-800 w-full max-w-sm">
          <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
          <input name="email" type="email" placeholder="Email" className="w-full mb-3 px-3 py-2 rounded bg-gray-800 text-white" required />
          <input name="password" type="password" placeholder="Password" className="w-full mb-3 px-3 py-2 rounded bg-gray-800 text-white" required />
          {error && <div className="text-red-400 mb-2">{error}</div>}
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded">Log In</button>
        </form>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white pb-16 px-4">
      <div className="max-w-2xl mx-auto py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Discourses Admin</h1>
          <button onClick={handleLogout} className="text-sm text-blue-400 hover:underline">Log Out</button>
        </div>
        <form onSubmit={handleSubmit} className="bg-gray-900 p-6 rounded-lg mb-8 border border-gray-800">
          <h2 className="text-xl font-semibold mb-4">{editingId ? "Edit Post" : "New Post"}</h2>
          <input type="text" placeholder="Title" className="w-full mb-3 px-3 py-2 rounded bg-gray-800 text-white" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} required />
          <input type="text" placeholder="Slug (e.g. my-first-post)" className="w-full mb-3 px-3 py-2 rounded bg-gray-800 text-white" value={form.slug} onChange={e => setForm({ ...form, slug: e.target.value })} required />
          <input type="text" placeholder="Excerpt (optional)" className="w-full mb-3 px-3 py-2 rounded bg-gray-800 text-white" value={form.excerpt} onChange={e => setForm({ ...form, excerpt: e.target.value })} />
          <textarea placeholder="Content" className="w-full mb-3 px-3 py-2 rounded bg-gray-800 text-white min-h-[120px]" value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} required />
          {error && <div className="text-red-400 mb-2">{error}</div>}
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded mr-2">{editingId ? "Update" : "Create"} Post</button>
          {editingId && (
            <button type="button" onClick={() => { setEditingId(null); setForm({ title: "", slug: "", excerpt: "", content: "" }); }} className="ml-2 text-gray-400 hover:underline">Cancel</button>
          )}
        </form>
        <h2 className="text-xl font-semibold mb-4">Your Posts</h2>
        <div className="space-y-4">
          {posts.map(post => (
            <div key={post.id} className="bg-gray-900 p-4 rounded border border-gray-800 flex justify-between items-center">
              <div>
                <div className="font-bold">{post.title}</div>
                <div className="text-gray-400 text-xs">{post.slug} • {new Date(post.created_at).toLocaleDateString()}</div>
                <div className="text-gray-300 text-sm line-clamp-1 max-w-xs">{post.excerpt}</div>
              </div>
              <div className="flex gap-2">
                <button onClick={() => handleEdit(post)} className="text-blue-400 hover:underline text-sm">Edit</button>
                <button onClick={() => handleDelete(post.id)} className="text-red-400 hover:underline text-sm">Delete</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
