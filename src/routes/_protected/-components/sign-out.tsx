import { useRouter } from "@tanstack/react-router";
import { useState } from "react";

import { toast } from "@/components/toast-wrapper";
import { Button } from "@/components/ui/button";
import { isHTTPError } from "@/lib/ky";
import { useAuthStore } from "@/stores/authStore";

export const SignOutButton = () => {
  const [pending, setPending] = useState(false);
  const router = useRouter();

  const logout = useAuthStore((state) => state.logout);

  const handleSignOut = async () => {
    try {
      setPending(true);
      await logout();
    } catch (error) {
      if (isHTTPError(error) && (error.response.status === 401 || error.response.status === 403)) {
        // no operation needed
      } else if (isHTTPError(error)) {
        toast.error("Logout failed", {
          description: "Could not sign out. Please try again.",
        });
      } else {
        toast.error("Network error", {
          description: "Could not reach the server.",
        });
      }
    } finally {
      setPending(false);
      router.navigate({
        to: "/signin",
        search: { redirect: "/dashboard" },
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
