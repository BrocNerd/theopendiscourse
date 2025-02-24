"use client";
import Link from "next/link";

export default function Page() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900 px-6 py-12">
      <h1 className="text-5xl font-bold mb-6">Events</h1>
      <p className="text-lg text-center max-w-2xl text-gray-700 mb-8">
        This page will soon feature a calendar of upcoming discussions, meetings, and other events.
        Stay tuned for updates!
      </p>

      {/* Placeholder for Future Calendar */}
      <div className="w-full max-w-lg h-64 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
        Calendar Coming Soon
      </div>
    </main>
  );
}
