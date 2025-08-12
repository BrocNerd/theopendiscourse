export default function BlogPage() {
	// Example blog posts (replace with dynamic data later)
	const posts = [
		{
			title: "Welcome to Our Club Blog!",
			date: "August 12, 2025",
			excerpt: "Discover club news, stories, and insights from our members.",
			image: "/images/america.jpg",
		},
		{
			title: "Event Recap: Summer Meetup",
			date: "July 28, 2025",
			excerpt: "A look back at our amazing summer event and what we learned.",
			image: "/images/greek-arena.jpg",
		},
		{
			title: "How to Get Involved",
			date: "June 15, 2025",
			excerpt: "Tips for new members on making the most of your club experience.",
			image: "/images/grand-library.jpg",
		},
	];

	return (
		<main className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-gray-800 text-white pb-16">
			{/* Hero Section */}
			<section className="text-center py-16 px-4">
				<h1 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-tight">Club Blog</h1>
				<p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-6">
					Read the latest updates, stories, and announcements from our club community.
				</p>
				<button className="mt-4 px-6 py-2 bg-white text-black font-semibold rounded-md shadow hover:bg-gray-200 transition">Write a Post</button>
			</section>

			{/* Blog Posts Grid */}
			<section className="max-w-5xl mx-auto px-4 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
				{posts.map((post, idx) => (
					<article key={idx} className="bg-gray-900 rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-transform border border-gray-800">
						<img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
						<div className="p-6">
							<h2 className="text-2xl font-bold mb-2">{post.title}</h2>
							<p className="text-gray-400 text-sm mb-2">{post.date}</p>
							<p className="text-gray-200 mb-4">{post.excerpt}</p>
							<button className="text-blue-400 hover:underline font-semibold">Read More</button>
						</div>
					</article>
				))}
			</section>
		</main>
	);
}
