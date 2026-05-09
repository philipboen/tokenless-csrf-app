import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

import { useAuthStore } from "@/stores/authStore";

export const Route = createFileRoute("/_protected")({
  beforeLoad: ({ location }) => {
    const { isAuthenticated } = useAuthStore.getState();
    if (!isAuthenticated) {
      const fullPath = location.pathname + (location.searchStr || "");
      throw redirect({
        to: "/signin",
        search: { redirect: fullPath },
      });
    }
  },
  component: () => <Outlet />,
});
