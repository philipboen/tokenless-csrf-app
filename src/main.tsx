import { createRouter, RouterProvider } from "@tanstack/react-router";
import * as React from "react";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";

// Import the generated route tree
import { routeTree } from "@/routeTree.gen";
import { useAuthStore } from "@/stores/authStore";

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function App() {
  const [isInitialized, setIsInitialized] = useState(false);
  const fetchAuthState = useAuthStore((state) => state.fetchAuthState);

  useEffect(() => {
    // Initial auth check using Zustand store
    fetchAuthState().finally(() => setIsInitialized(true));
  }, [fetchAuthState]);

  // Block rendering until auth is
  // initialized to avoid stale state
  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">Loading auth state...</div>
    );
  }

  return <RouterProvider router={router} />;
}

// Render the app
const rootElement = document.getElementById("root")!;
if (!rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    import.meta.env.MODE === "development" ? (
      <React.StrictMode>
        <App />
      </React.StrictMode>
    ) : (
      <App />
    ),
  );
}
