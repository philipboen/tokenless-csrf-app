import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/")({
  component: DashboardPage,
});

function DashboardPage() {
  return (
    <div className="p-4">
      <h3>This is an authenticated (protected) route</h3>
      <p>Welcome to your mock dashboard</p>
    </div>
  );
}
