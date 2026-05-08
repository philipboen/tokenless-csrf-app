import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_protected/account")({
  component: AccountPage,
});

function AccountPage() {
  return <div className="p-4">This is the Account Page</div>;
}
