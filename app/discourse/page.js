"use client";
import Link from "next/link";

export default function Page() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900 px-6 py-12">
      <h1 className="text-5xl font-bold mb-6">Discourse</h1>
      <p className="text-lg text-center max-w-2xl text-gray-700 mb-8">
        This page will soon become a space where people can share ideas, discuss topics, and engage in meaningful conversations.
        Join our community and be part of the conversation!
      </p>
      
      {/* Discord Invite Link */}
      <Link
        href="https://discord.gg/F7MuxeF8Bt" // Replace with actual link
        target="_blank"
        className="bg-black text-white px-6 py-3 rounded-md text-lg hover:bg-gray-800 transition"
      >
        Join the Discussion on Discord
      </Link>
    </main>
  );
}
