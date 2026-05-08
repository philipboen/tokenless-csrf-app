import { createFileRoute, Link, useNavigate, useRouter } from "@tanstack/react-router";
import { isHTTPError } from "ky";
import { useEffect, useState } from "react";

import type { AppHTTPError } from "@/lib/ky";

import { Button } from "@/components/ui/button";
import { getAuthState } from "@/lib/auth";
import { authApi } from "@/lib/ky";
import { VerifyStateComponent } from "@/routes/(auth)/_auth/signin/verify-email/-component/verify-state";

export const Route = createFileRoute("/(auth)/_auth/signin/verify-email/$token")({
  component: RouteComponent,
});

export type VerifyStatus = "pending" | "success" | "invalid_token" | "error" | "network_error";
const REDIRECT_DELAY_MS = 4_000;

function RouteComponent() {
  const { token } = Route.useParams();
  const navigate = useNavigate();
  const router = useRouter();
  const { setAuth } = Route.useRouteContext();

  const [status, setStatus] = useState<VerifyStatus>("pending");
  const [countdown, setCountdown] = useState(REDIRECT_DELAY_MS / 1000);
  const delay = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    const verify = async () => {
      try {
        await Promise.all([
          authApi.post("/verify-email/activate", { json: { token } }),
          delay(1200),
        ]);
        setStatus("success");
      } catch (error) {
        if (isHTTPError(error)) {
          const code = (error as AppHTTPError).data?.error.code;
          setStatus(code === "INVALID_TOKEN" ? "invalid_token" : "error");
        } else {
          setStatus("network_error");
        }
      }
    };

    verify();
  }, [token]);

  useEffect(() => {
    if (status !== "success") return;

    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    const timeout = setTimeout(async () => {
      clearInterval(interval);
      const newAuth = await getAuthState();
      setAuth(newAuth);
      await router.invalidate();
      navigate({ to: "/dashboard" });
    }, REDIRECT_DELAY_MS);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [status, navigate, router, setAuth]);

  return (
    <div className="min-h-screen py-12 px-4">
      {status !== "success" ? (
        <VerifyStateComponent status={status} />
      ) : (
        <div className="text-center space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold font-serif">
              Your email has been verified successfully!
            </h3>
            <p className="text-sm text-muted-foreground">
              You will be redirected to your dashboard in {countdown} seconds.
            </p>
          </div>
          <div className="space-y-2">
            <p className="text-xs text-muted-foreground">
              If you are not redirected automatically, please click the button below.
            </p>
            <Button asChild className="w-fit rounded-none">
              <Link to="/dashboard">Go to Dashboard</Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
