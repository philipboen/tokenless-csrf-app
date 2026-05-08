import type { RouterContext } from "@tanstack/react-router";

import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";

const RootLayout = () => (
  <>
    <div className="max-container">
      <Outlet />
    </div>
    <Toaster position="top-center" />
    {import.meta.env.MODE === "development" && <TanStackRouterDevtools />}
  </>
);

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootLayout,
  errorComponent: ({ error }) => {
    console.error("Root error boundary caught:", error);
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md text-center space-y-4">
          <h1 className="text-2xl font-bold text-destructive">Something went wrong</h1>
          <p className="text-muted-foreground">An unexpected error occurred</p>
          <Button className="rounded-none" onClick={() => window.location.reload()}>
            Reload Page
          </Button>
        </div>
      </div>
    );
  },
});
