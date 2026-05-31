import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";

const STATE_CONTENT: Record<string, { title: string; description: string }> = {
  pending: {
    title: "Verifying password reset link",
    description: "Please hold on while we validate your password reset link…",
  },
  invalid_token: {
    title: "Invalid or expired link",
    description:
      "The password reset link is invalid or has expired. Return to the forgot password page to request a new one.",
  },
  error: {
    title: "Error",
    description: "An error occurred while resetting your password.",
  },
  network_error: {
    title: "Network Error",
    description: "A network error occurred. Please check your connection and try again.",
  },
};

export const VerifyStateComponent = ({ status }: { status: string }) => {
  const content = STATE_CONTENT[status];
  if (!content) return null;

  return (
    <div className="text-center space-y-2">
      <h2 className="text-lg font-semibold font-serif">{content.title}</h2>
      <p className="text-sm text-muted-foreground">{content.description}</p>
      {status !== "pending" && (
        <Button asChild className="w-fit rounded-none">
          <Link to="/signin/forgot-password">Request new reset link</Link>
        </Button>
      )}
    </div>
  );
};
