"use client";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Database } from "@/types/supabase";
import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";

import { Button, Label, TextInput } from "flowbite-react";
import { HiOutlineArrowLeft } from "react-icons/hi";

export default function AccountForm({ session }: { session: Session | null }) {
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();
  const [loading, setLoading] = useState(true);
  const [fullname, setFullname] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [website, setWebsite] = useState<string | null>(null);
  const [avatar_url, setAvatarUrl] = useState<string | null>(null);
  const user = session?.user;

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);

      let { data, error, status } = await supabase
        .from("profiles")
        .select(`full_name, username, website, avatar_url`)
        .eq("id", user?.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setFullname(data.full_name);
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      alert("Error loading user data!");
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  useEffect(() => {
    getProfile();
  }, [user, getProfile]);

  async function updateProfile({
    username,
    website,
    avatar_url,
  }: {
    username: string | null;
    fullname: string | null;
    website: string | null;
    avatar_url: string | null;
  }) {
    try {
      setLoading(true);

      let { error } = await supabase.from("profiles").upsert({
        id: user?.id as string,
        full_name: fullname,
        username,
        website,
        avatar_url,
        updated_at: new Date().toISOString(),
      });
      if (error) throw error;
      alert("Profile updated!");
    } catch (error) {
      alert("Error updating the data!");
    } finally {
      setLoading(false);
    }
  }

  const handleBackToMain = () => {
    router.push("/");
  };

  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <div className="w-[30rem]">
        <Button color="light" size="sm" onClick={handleBackToMain}>
          <HiOutlineArrowLeft className="mr-2 h-5 w-5" />
          <p>Notebooks</p>
        </Button>
        <h1 className="text-4xl font-medium text-slate-700">
          Account Settings
        </h1>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="email" value="Email" />
          </div>
          <TextInput
            id="email"
            type="text"
            value={session?.user.email}
            disabled
            className="mb-2"
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="fullName" value="Full Name" />
          </div>
          <TextInput
            id="fullName"
            type="text"
            value={fullname || ""}
            onChange={(e) => setFullname(e.target.value)}
            className="mb-2"
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="username" value="Username" />
          </div>
          <TextInput
            id="username"
            type="text"
            value={username || ""}
            onChange={(e) => setUsername(e.target.value)}
            className="mb-2"
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label htmlFor="website" value="Website" />
          </div>
          <TextInput
            id="website"
            type="url"
            value={website || ""}
            onChange={(e) => setWebsite(e.target.value)}
            className="pb-2"
          />
        </div>
        <div className="mt-4 flex">
          <Button
            type="submit"
            size="sm"
            color="success"
            className="button primary block"
            onClick={() =>
              updateProfile({ fullname, username, website, avatar_url })
            }
            disabled={loading}
          >
            {loading ? "Loading ..." : "Update"}
          </Button>
          <div className="ml-2">
            <form action="/auth/signout" method="post">
              <Button type="submit" color="failure" size="sm" outline>
                Sign out
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
