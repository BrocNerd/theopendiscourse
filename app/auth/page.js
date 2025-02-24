"use client";
import { useState, useEffect } from "react";
import { supabase } from "../../utils/supabase";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [user, setUser] = useState(null);

  // Check if a user is already logged in
  useEffect(() => {
    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser();
      if (data?.user) {
        setUser(data.user);
        router.push("/dashboard"); // Redirect logged-in users
      }
    };
    fetchUser();
  }, [router]);

  // Sign Up Function
  const handleSignUp = async () => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Check your email for a confirmation link!");
    }
  };

  // Log In Function
  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
    } else {
      setMessage("Logged in successfully!");
      router.push("/dashboard"); // Redirect after login
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-900 px-6 py-12">
      <h1 className="text-5xl font-bold mb-6">Login / Sign Up</h1>
      
      {/* Input Fields */}
      <div className="w-full max-w-sm">
        <input
          className="w-full p-3 mb-3 border border-gray-300 rounded-lg text-gray-900"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg text-gray-900"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Buttons */}
        <button
          className="w-full p-3 bg-black text-white rounded-lg hover:bg-gray-800 transition mb-3"
          onClick={handleSignUp}
        >
          Sign Up
        </button>
        <button
          className="w-full p-3 bg-white text-black border border-black rounded-lg hover:bg-gray-200 transition"
          onClick={handleLogin}
        >
          Log In
        </button>
      </div>

      {/* Message Display */}
      {message && <p className="mt-4 text-gray-700">{message}</p>}
    </main>
  );
}
