"use client";
import { useEffect, useState } from "react";
import { supabase } from "../../utils/supabase";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (data?.user) {
        setUser(data.user);
      } else {
        router.push("/auth"); // Redirect if not logged in
      }
    };
    fetchUser();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/auth"); // Redirect to login page after logout
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-4xl font-bold mb-4">Welcome to Your Dashboard</h1>
      {user ? (
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
          <p className="text-lg mb-4">Hello, <span className="font-bold">{user.email}</span> 👋</p>
          <button
            onClick={handleLogout}
            className="px-6 py-3 bg-red-500 hover:bg-red-600 rounded-lg text-white font-semibold"
          >
            Log Out
          </button>
        </div>
      ) : (
        <p className="text-lg">Loading user info...</p>
      )}
    </div>
  );
}
