import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";

// Initialize TanStack Query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, refetchOnWindowFocus: false },
    mutations: { retry: 0 },
  },
});

const RootLayout = () => (
  <QueryClientProvider client={queryClient}>
    <div className="max-container">
      <Outlet />
    </div>
    <Toaster position="top-center" />
    {import.meta.env.MODE === "development" && (
      <>
        <TanStackRouterDevtools />
        <ReactQueryDevtools initialIsOpen={false} />
      </>
    )}
  </QueryClientProvider>
);

export const Route = createRootRoute({
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
