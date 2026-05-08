import { createRouter, RouterProvider } from "@tanstack/react-router";
import * as React from "react";
import { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";

import type { AuthState } from "@/lib/auth";

import { getAuthState } from "@/lib/auth";
// Import the generated route tree
import { routeTree } from "@/routeTree.gen";

declare module "@tanstack/react-router" {
  interface RouterContext {
    auth: AuthState;
    setAuth: (state: AuthState) => void;
  }
}

// Create a new router instance
const router = createRouter({
  routeTree,
  context: {
    auth: { user: null, isAuthenticated: false },
    setAuth: () => {},
  },
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

function App() {
  const [auth, setAuth] = useState<AuthState>({ user: null, isAuthenticated: false });
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Hydrate auth state once on app mount
    getAuthState()
      .then((state) => setAuth(state))
      .catch(() => setAuth({ user: null, isAuthenticated: false }))
      .finally(() => setIsInitialized(true));
  }, []);

  // Block rendering until auth is
  // initialized to avoid stale state
  if (!isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">Loading auth state...</div>
    );
  }

  return <RouterProvider router={router} context={{ auth, setAuth }} />;
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
