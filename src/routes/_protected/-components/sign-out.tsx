import { useRouteContext, useRouter } from "@tanstack/react-router";
import { useState } from "react";

import { toast } from "@/components/toast-wrapper";
import { Button } from "@/components/ui/button";
import { authApi, isHTTPError } from "@/lib/ky";

export const SignOutButton = () => {
  const [pending, setPending] = useState(false);
  const { setAuth } = useRouteContext({ from: "/_protected/dashboard/" });
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      setPending(true);
      await authApi.post("logout");
    } catch (error) {
      if (!isHTTPError(error)) toast.error("Network error during signout");
    } finally {
      setPending(false);
      setAuth({ user: null, isAuthenticated: false });
      router.navigate({
        to: "/signin",
        search: { redirect: "/_protected/dashboard/" },
        // Prevents going back to protected route after sign-out
        replace: true,
      });
    }
  };

  return (
    <Button onClick={handleSignOut} disabled={pending} className="mt-6 rounded-none">
      Sign Out
    </Button>
  );
};
