"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/utils/supabase";
import Link from "next/link";

export default function NewPostButton() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data?.user || null);
    };
    const { data: sub } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });
    getUser();
    return () => sub.subscription.unsubscribe();
  }, []);

  if (!user) return null;

  return (
    <div className="flex justify-end max-w-3xl mx-auto px-4 mb-4">
      <Link href="/discourses/admin">
        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">New Post</button>
      </Link>
    </div>
  );
}
