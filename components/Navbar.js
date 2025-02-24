"use client";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi"; // Import icons for mobile menu

export default function Navbar() {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false); // Track menu state
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
    <nav className="relative bg-black text-white px-6 py-2 flex items-center justify-between shadow-md z-50">
      {/* Left: Website Name */}
      <Link href="/" className="text-2xl font-bold tracking-wide hover:opacity-80 transition">
        The Open Discourse
      </Link>

      {/* Center: Desktop Navigation Links */}
      <div className="hidden md:flex space-x-8">
        <Link href="/" className="text-lg hover:text-gray-400 transition">Home</Link>
        <Link href="/discourse" className="text-lg hover:text-gray-400 transition">Discourse</Link>
        <Link href="/events" className="text-lg hover:text-gray-400 transition">Events</Link>
        <Link href="/about" className="text-lg hover:text-gray-400 transition">About</Link>
      </div>

      {/* Right: Authentication */}
      <div className="hidden md:block">
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

      {/* Mobile Menu Button (Hamburger) */}
      <button
        className="md:hidden text-white text-2xl z-50 relative"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FiX /> : <FiMenu />}
      </button>

      {/* Mobile Navigation Menu (Dropdown) */}
      {menuOpen && (
        <div className="absolute top-14 left-0 w-full bg-black text-white flex flex-col items-center space-y-4 py-6 md:hidden z-40">
          <Link href="/" className="text-lg hover:text-gray-400 transition" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link href="/discourse" className="text-lg hover:text-gray-400 transition" onClick={() => setMenuOpen(false)}>Discourse</Link>
          <Link href="/events" className="text-lg hover:text-gray-400 transition" onClick={() => setMenuOpen(false)}>Events</Link>
          <Link href="/about" className="text-lg hover:text-gray-400 transition" onClick={() => setMenuOpen(false)}>About</Link>

          {/* Mobile Log In/Out Button */}
          {user ? (
            <button
              onClick={() => { handleLogout(); setMenuOpen(false); }}
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
      )}
    </nav>
  );
}
