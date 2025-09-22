"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";

export default function EditPostInline({ initialPost, slug: initialSlug }) {
  const [user, setUser] = useState(null);
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({ title: "", slug: "", excerpt: "", content: "" });
  const [status, setStatus] = useState("");

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data?.user || null);
    };
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });
    getUser();
    return () => sub.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (initialPost) {
      setForm({
        title: initialPost.title || "",
        slug: initialPost.slug || initialSlug,
        excerpt: initialPost.excerpt || "",
        content: initialPost.content || "",
      });
    }
  }, [initialPost, initialSlug]);

  if (!user) return null;

  async function save() {
    setStatus("");
    if (!form.title || !form.slug || !form.content) {
      setStatus("Title, slug, and content are required.");
      return;
    }
    try {
      // Upsert by slug (onConflict)
      const { error } = await supabase.from("blog_posts").upsert([
        {
          title: form.title,
          slug: form.slug,
          excerpt: form.excerpt,
          content: form.content,
          created_at: initialPost?.created_at || new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ], { onConflict: "slug" });
      if (error) throw error;
      setStatus("Saved. Reloading...");
      // If slug changed, navigate to new URL
      if (form.slug !== initialSlug) {
        window.location.href = `/discourses/${form.slug}`;
      } else {
        window.location.reload();
      }
    } catch (e) {
      console.error(e);
      setStatus("Save failed: " + (e.message || e.toString()));
    }
  }

  return (
    <div className="max-w-3xl mx-auto px-4 mb-6">
      {!editing ? (
        <div className="flex justify-end">
          <button onClick={() => setEditing(true)} className="bg-yellow-500 text-black px-3 py-1 rounded">Edit Post</button>
        </div>
      ) : (
        <div className="bg-gray-900 rounded-lg p-4 border border-gray-800">
          <div className="flex justify-between items-center mb-3">
            <strong>Edit Post</strong>
            <div className="flex gap-2">
              <button onClick={() => { setEditing(false); setStatus(""); }} className="text-gray-300">Close</button>
            </div>
          </div>
          <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Title" className="w-full mb-2 px-2 py-1 rounded bg-gray-800 text-white" />
          <input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="Slug" className="w-full mb-2 px-2 py-1 rounded bg-gray-800 text-white" />
          <input value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} placeholder="Excerpt" className="w-full mb-2 px-2 py-1 rounded bg-gray-800 text-white" />
          <textarea value={form.content} onChange={(e) => setForm({ ...form, content: e.target.value })} placeholder="Content" className="w-full mb-2 px-2 py-1 rounded bg-gray-800 text-white min-h-[160px]" />
          {status && <div className="text-sm text-yellow-300 mb-2">{status}</div>}
          <div className="flex gap-2">
            <button onClick={save} className="bg-blue-600 px-3 py-1 rounded text-white">Save</button>
            <button onClick={() => { setEditing(false); setForm({ title: initialPost.title, slug: initialPost.slug, excerpt: initialPost.excerpt, content: initialPost.content }); setStatus(""); }} className="bg-gray-700 px-3 py-1 rounded text-white">Reset</button>
          </div>
        </div>
      )}
    </div>
  );
}
