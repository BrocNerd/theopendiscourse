import { redirect } from 'next/navigation'

export default function BlogRedirect() {
  // Permanent redirect from /blog to /discourses
  redirect('/discourses')
}
import Link from "next/link";
import { blogPosts } from "./posts/data";

export default function BlogPage() {
	// Sort posts by date (most recent first)
	const posts = [...blogPosts].sort((a, b) => new Date(b.date) - new Date(a.date));
	const [latest, ...others] = posts;

	return (
		<main className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-gray-800 text-white pb-16">
			{/* Hero Section */}
			<section className="text-center py-16 px-4">
				<h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">Discourses</h1>
			</section>

			{/* Most Recent Blog Post */}
			{latest && (
				<section className="max-w-3xl mx-auto px-4 mb-12">
					<Link href={`/blog/${latest.slug}`}>
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
							<Link key={post.slug} href={`/blog/${post.slug}`}>
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
