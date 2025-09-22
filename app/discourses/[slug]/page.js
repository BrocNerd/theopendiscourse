import EditPostInline from "@/components/EditPostInline";
import { blogPosts as staticPosts } from "../posts/data";
import { supabase } from "@/utils/supabase";

export default async function DiscoursesPostPage({ params }) {
  let post = null;
  try {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("id,title,slug,excerpt,content,created_at,updated_at")
      .eq("slug", params.slug)
      .single();
    if (!error && data) {
      post = {
        id: data.id,
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt,
        content: data.content,
        date: data.created_at,
        updated_at: data.updated_at,
      };
    }
  } catch (e) {
    // ignore and fallback
  }

  if (!post) {
    post = staticPosts.find((p) => p.slug === params.slug) || null;
  }

  if (!post) {
    return (
      <main className="min-h-screen flex items-center justify-center text-white">
        <div className="bg-gray-900 p-8 rounded-lg shadow-lg border border-gray-800">
          <h1 className="text-2xl font-bold mb-4">Post Not Found</h1>
          <p className="text-gray-300">Sorry, the blog post you’re looking for doesn’t exist.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-gray-800 text-white pb-16 px-4">
      {/* Inline editor will only show to logged-in admins and allows updating the post in-place */}
      <EditPostInline initialPost={post} slug={params.slug} />
      <article className="max-w-3xl mx-auto bg-gray-900 rounded-lg shadow-lg border border-gray-800 p-8">
        <h1 className="text-4xl font-extrabold mb-2">{post.title}</h1>
        <p className="text-gray-400 text-sm mb-6">{new Date(post.date).toLocaleDateString()}</p>
        <div className="text-lg text-gray-200 whitespace-pre-line">{post.content}</div>
      </article>
    </main>
  );
}

export async function generateStaticParams() {
  return staticPosts.map((post) => ({ slug: post.slug }));
}
