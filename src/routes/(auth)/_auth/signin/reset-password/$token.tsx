import { useMutation } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { isHTTPError } from "ky";
import { useEffect, useState } from "react";

import type { AppHTTPError } from "@/lib/ky";
import type { VerifyStatus } from "@/lib/types";

import { authApi } from "@/lib/ky";
import { ResetPasswordComponent } from "@/routes/(auth)/_auth/signin/reset-password/-component/reset-password";
import { VerifyStateComponent } from "@/routes/(auth)/_auth/signin/reset-password/-component/verify-state";

export const Route = createFileRoute("/(auth)/_auth/signin/reset-password/$token")({
  component: RouteComponent,
});

const verifyResetPasswordMutationFn = async (token: string) => {
  await authApi.post("forgot-password/verify", { json: { token } });
};

function RouteComponent() {
  const { token } = Route.useParams();
  const [status, setStatus] = useState<VerifyStatus>("pending");

  const { mutate } = useMutation({
    mutationFn: verifyResetPasswordMutationFn,
    onSuccess: () => setStatus("success"),
    onError: (error) => {
      if (isHTTPError(error)) {
        const code = (error as AppHTTPError).data?.error?.code;
        setStatus(code === "INVALID_TOKEN" ? "invalid_token" : "error");
      } else {
        setStatus("network_error");
      }
    },
  });

  useEffect(() => {
    mutate(token);
  }, [token, mutate]);

  return (
    <>
      {status !== "success" ? (
        <div className="min-h-screen py-12 px-4">
          <VerifyStateComponent status={status} />
        </div>
      ) : (
        <ResetPasswordComponent token={token} />
      )}
    </>
  );
}
