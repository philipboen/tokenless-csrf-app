import { createFileRoute, Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { SignOutButton } from "@/routes/_protected/-components/sign-out";
import { useAuthStore } from "@/stores/authStore";

export const Route = createFileRoute("/_protected/dashboard/")({
  component: DashboardPage,
});

function DashboardPage() {
  const user = useAuthStore((state) => state.user);
  const data = JSON.stringify(user, null, 2);

  return (
    <div className="p-4">
      <h3>This is an authenticated (protected) route</h3>
      <p>
        Welcome, {user?.firstName} {user?.lastName} of email {user?.email}!
      </p>

      <div className="mt-4 p-4 bg-muted rounded w-fit">
        <h4 className="font-medium">Mock user info:</h4>
        <pre className="mt-2 text-sm">{data}</pre>
      </div>

      <div className="mt-4 flex flex-col w-fit *:p-0 *:justify-start *:items-start">
        <Button asChild variant="link">
          <Link to="/">Back to Home</Link>
        </Button>
        <Button asChild variant="link">
          <Link to="/account">account page</Link>
        </Button>
        <Button asChild variant="link">
          <Link to="/about">about page</Link>
        </Button>
        <Button asChild variant="link">
          <Link to="/signin" search={{ redirect: "/_protected/dashboard/" }}>
            sign in page
          </Link>
        </Button>
        <Button asChild variant="link">
          <Link to="/signup">sign up page</Link>
        </Button>
      </div>

      <SignOutButton />
    </div>
  );
}
