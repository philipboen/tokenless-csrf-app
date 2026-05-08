import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected")({
  beforeLoad: ({ context, location }) => {
    if (!context.auth.isAuthenticated) {
      const fullPath = location.pathname + (location.searchStr || "");
      throw redirect({
        to: "/signin",
        search: { redirect: fullPath },
      });
    }
  },
  component: () => <Outlet />,
});
