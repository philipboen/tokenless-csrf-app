import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(auth)/_auth")({
  beforeLoad: ({ context }) => {
    // Redirect logged-in users away from auth routes
    if (context.auth.isAuthenticated) {
      throw redirect({ to: "/dashboard" });
    }
  },
  component: () => <Outlet />,
});
