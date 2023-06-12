"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import UserDashboard from "@/components/UserDashboard";
import Footer from "@/components/Footer";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { User } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";

export default function Home() {
  const supabase = createClientComponentClient<Database>();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetchUser();
  }, []);

  const fetchUser = async () => {
    const { data, error } = await supabase.auth.getUser();

    if (error) {
      console.error("Error fetching user", error);
    } else if (data) {
      setUser(data.user);
    }
  };

  return (
    <main className="flex min-h-screen w-screen flex-col items-center justify-start">
      <Navbar />
      {user && user.email ? (
        <UserDashboard username={user.email} />
      ) : (
        <div className="text-4xl font-light tracking-tighter pt-[25rem] px-[2rem]">
          <p>Please, log in to view your dashboard.</p>
        </div>
      )}
      <Footer />
    </main>
  );
}
