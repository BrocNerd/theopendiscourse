"use client";

export default function Page() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900 px-6 py-12">
      <h1 className="text-5xl font-bold mb-6">About The Open Discourse Collective</h1>
      <p className="text-lg max-w-2xl text-center text-gray-700 mb-8">
        This website is a place for members to connect, share insights, and engage in thoughtful discussions. 
        We value open-mindedness, critical thinking, and meaningful conversations. 
      </p>

      {/* Future Expansion Placeholder */}
      <div className="w-full max-w-lg h-64 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
        More features coming soon...
      </div>
    </main>
  );
}
