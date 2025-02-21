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

    // Listen for auth changes (fix issue where login status doesn't update)
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

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
    <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold">
        The Open Discourse
      </Link>
      <div className="flex gap-4">
        <Link href="/" className="hover:underline">
          Home
        </Link>
        <Link href="/about" className="hover:underline">
              About
            </Link>
        {user ? (
          <>
            <Link href="/dashboard" className="hover:underline">
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
            >
              Log Out
            </button>
          </>
        ) : (
          <Link href="/auth" className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600">
            Log In
          </Link>
        )}
      </div>
    </nav>
  );
}
