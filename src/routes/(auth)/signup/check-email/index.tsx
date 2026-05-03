import { IconMailForward } from "@tabler/icons-react";
import { createFileRoute, Link } from "@tanstack/react-router";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/(auth)/signup/check-email/")({
  component: CheckEmailRC,
});

function CheckEmailRC() {
  return (
    <div className="flex flex-col min-h-screen justify-center items-center sm:p-4">
      <Card className="w-full max-w-md px-0 sm:px-4 text-center ring-0 sm:ring-1 max-2xl:mx-auto shadow-none sm:shadow-md border-none sm:border-solid py-12 sm:py-6 bg-transparent sm:bg-card">
        <CardHeader className="flex flex-col items-center justify-center space-y-4">
          <div className="flex bg-primary/10 p-4 rounded-full">
            <IconMailForward className="size-10 text-primary" stroke={1.5} />
          </div>
          <div className="space-y-2">
            <CardTitle className="text-2xl font-semibold tracking-tight">
              Check your email
            </CardTitle>
            <CardDescription className="text-base pt-2">
              We&apos;ve sent a verification link to your email address.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-sm text-muted-foreground w-11/12 mx-auto">
            Please click the link in the email to verify your account and complete the signup
            process. If you don&apos;t see it, you may need to check your spam folder.
          </p>
          <Button asChild className="w-full" size="lg">
            <Link to="/signin">Back to sign in</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
