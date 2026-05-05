import { Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";

const STATE_CONTENT: Record<string, { title: string; description: string }> = {
  pending: {
    title: "Verifying your email",
    description: "Please hold on while we activate your account…",
  },
  invalid_token: {
    title: "Invalid or expired token",
    description:
      "The verification link is invalid or has expired. Please sign in again to receive a new verification email.",
  },
  error: {
    title: "Error",
    description: "An error occurred while verifying your email.",
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
          <Link to="/signin">Go to Sign In</Link>
        </Button>
      )}
    </div>
  );
};
