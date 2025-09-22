import Link from "next/link";
import { blogPosts as staticPosts } from "./posts/data";
import { supabase } from "@/utils/supabase";
import NewPostButton from "@/components/NewPostButton";

export default async function DiscoursesPage() {
  // Try fetching posts from Supabase first so admin-created posts appear
  let posts = [];
  try {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("id, title, slug, excerpt, content, created_at")
      .order("created_at", { ascending: false });
    if (!error && data && data.length > 0) {
      posts = data.map((p) => ({
        slug: p.slug,
        title: p.title,
        date: p.created_at || p.date,
        excerpt: p.excerpt || "",
        content: p.content || "",
      }));
    }
  } catch (err) {
    // ignore and fallback to static posts
  }

  if (!posts || posts.length === 0) {
    // Fallback to bundled static posts
    posts = [...staticPosts].sort((a, b) => new Date(b.date) - new Date(a.date));
  }

  const [latest, ...others] = posts;

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-gray-800 text-white pb-16">
      {/* Hero Section */}
      <section className="text-center py-16 px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">Discourses</h1>
      </section>

      {/* Admin New Post Button (visible only to logged-in admins) */}
      {/* NewPostButton is a client component that checks supabase auth */}
      <NewPostButton />

      {/* Most Recent Blog Post */}
      {latest && (
        <section className="max-w-3xl mx-auto px-4 mb-12">
          <Link href={`/discourses/${latest.slug}`}>
            <article className="bg-gray-900 rounded-lg shadow-lg border border-gray-800 p-8 hover:scale-[1.01] transition-transform cursor-pointer">
              <h2 className="text-3xl font-bold mb-2">{latest.title}</h2>
              <p className="text-gray-400 text-sm mb-4">{new Date(latest.date).toLocaleDateString()}</p>
              <p className="text-gray-200 mb-4">{latest.excerpt}</p>
              <span className="text-blue-400 hover:underline font-semibold">Read More →</span>
            </article>
          </Link>
        </section>
      )}

      {/* Other Blog Posts */}
      {others.length > 0 && (
        <section className="max-w-3xl mx-auto px-4">
          <h3 className="text-xl font-bold mb-4">Previous Posts</h3>
          <div className="space-y-6">
            {others.map((post) => (
              <Link key={post.slug} href={`/discourses/${post.slug}`}>
                <article className="bg-gray-900 rounded-lg border border-gray-800 p-6 hover:bg-gray-800 transition cursor-pointer">
                  <h4 className="text-2xl font-semibold mb-1">{post.title}</h4>
                  <p className="text-gray-400 text-sm mb-2">{new Date(post.date).toLocaleDateString()}</p>
                  <p className="text-gray-200 mb-2 line-clamp-4">{post.excerpt}</p>
                  <span className="text-blue-400 hover:underline font-semibold">Read More →</span>
                </article>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
