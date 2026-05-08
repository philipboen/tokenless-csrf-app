import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/forgot-password")({
  component: ForgotPasswordRC,
});

function ForgotPasswordRC() {
  return <div className="p-4">This is the forgot password page</div>;
}
