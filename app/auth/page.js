"use client";
import { useState, useEffect } from "react";
import { supabase } from "../../utils/supabase";
import { useRouter } from "next/navigation";

export default function Auth() {
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
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-4">Login / Sign Up</h1>
      <input
        className="p-2 mb-2 text-black rounded"
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="p-2 mb-2 text-black rounded"
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="p-2 bg-blue-500 hover:bg-blue-600 rounded mb-2"
        onClick={handleSignUp}
      >
        Sign Up
      </button>
      <button
        className="p-2 bg-green-500 hover:bg-green-600 rounded"
        onClick={handleLogin}
      >
        Log In
      </button>
      {message && <p className="mt-4">{message}</p>}
    </div>
  );
}
