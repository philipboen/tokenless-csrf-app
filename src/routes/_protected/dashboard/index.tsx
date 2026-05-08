import { createFileRoute, Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { SignOutButton } from "@/routes/_protected/-components/sign-out";

export const Route = createFileRoute("/_protected/dashboard/")({
  component: DashboardPage,
});

function DashboardPage() {
  const { auth } = Route.useRouteContext();
  const data = JSON.stringify(auth.user, null, 2);

  return (
    <div className="p-4">
      <h3>This is an authenticated (protected) route</h3>
      <p>
        Welcome, {auth.user?.firstName} {auth.user?.lastName} of email {auth.user?.email}!
      </p>

      <div className="mt-4 p-4 bg-muted rounded w-fit">
        <h4 className="font-medium">Mock user info:</h4>
        <pre className="mt-2 text-sm">{data}</pre>
      </div>

      <div className="space-y-2 mt-4 flex flex-col w-fit">
        <Button asChild variant="link">
          <Link to="/">Back to Home</Link>
        </Button>
        <Button asChild variant="link">
          <Link to="/account">Go to account page</Link>
        </Button>
        <Button asChild variant="link">
          <Link to="/about">Go to about page</Link>
        </Button>
        <Button asChild variant="link">
          <Link to="/signin" search={{ redirect: "/_protected/dashboard/" }}>
            Go to sign in page
          </Link>
        </Button>
        <Button asChild variant="link">
          <Link to="/signup">Go to sign up page</Link>
        </Button>
      </div>

      <SignOutButton />
    </div>
  );
}
