"use client";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (data?.user) {
        setUser(data.user);
      }
    };

    // Listen for auth changes
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user || null);
      }
    );

    fetchUser();

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push("/auth");
  };

  return (
    <nav className="bg-black text-white px-6 py-3 flex items-center justify-between shadow-md">
      {/* Left: Website Name (Larger Text for Impact) */}
      <Link href="/" className="text-2xl font-bold tracking-wide hover:opacity-80 transition">
        The Open Discourse
      </Link>

      {/* Center: Fully Centered Navigation Links (Larger & Spread Out) */}
      <div className="absolute left-1/2 transform -translate-x-1/2 flex space-x-8">
        <Link href="/" className="text-lg hover:text-gray-400 transition">Home</Link>
        <Link href="/discourse" className="text-lg hover:text-gray-400 transition">Discourse</Link>
        <Link href="/events" className="text-lg hover:text-gray-400 transition">Events</Link>
        <Link href="/about" className="text-lg hover:text-gray-400 transition">About</Link>
      </div>

      {/* Right: Authentication (Sleek Log In/Log Out) */}
      <div>
        {user ? (
          <button
            onClick={handleLogout}
            className="border border-white px-4 py-2 rounded-md text-white hover:bg-white hover:text-black transition"
          >
            Log Out
          </button>
        ) : (
          <Link href="/auth">
            <button className="border border-white px-4 py-2 rounded-md text-white hover:bg-white hover:text-black transition">
              Log In
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
}
