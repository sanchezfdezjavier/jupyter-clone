"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { User } from "@supabase/supabase-js";
import { Database } from "@/types/supabase";
import { Button, Badge } from "flowbite-react";

import { base_frontend_endpoint } from "@/config";

export default function UserAuthComponent() {
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();
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

  const goToAccount = () => {
    router.push("/account");
  };

  if (user) {
    return (
      <div className="flex items-center space-x-4">
        <div className="text-sm font-medium">
          <Badge color="gray">{user.email}</Badge>
        </div>
        <Button color="gray" size="xs" onClick={goToAccount}>
          Account Settings
        </Button>
      </div>
    );
  } else {
    return (
      <Auth
        supabaseClient={supabase}
        view="magic_link"
        appearance={{ theme: ThemeSupa }}
        theme="light"
        showLinks={false}
        providers={["google"]}
        redirectTo={`${base_frontend_endpoint}/auth/callback`} // TODO: Update when deployed
        onlyThirdPartyProviders={true}
      />
    );
  }
}
