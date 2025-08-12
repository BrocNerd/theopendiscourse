import { blogPosts } from "../posts/data";

export default function BlogPostPage({ params }) {
  const post = blogPosts.find((p) => p.slug === params.slug);

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
      <article className="max-w-3xl mx-auto bg-gray-900 rounded-lg shadow-lg border border-gray-800 p-8 mt-12">
        <h1 className="text-4xl font-extrabold mb-2">{post.title}</h1>
        <p className="text-gray-400 text-sm mb-6">{new Date(post.date).toLocaleDateString()}</p>
        <div className="text-lg text-gray-200 whitespace-pre-line">{post.content}</div>
      </article>
    </main>
  );
}

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}
