import { zodResolver } from "@hookform/resolvers/zod";
import { IconChevronLeft } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { isHTTPError } from "ky";
import { Controller, useForm } from "react-hook-form";

import type { ForgotPassword } from "@/lib/validations";

import { LoadingButton } from "@/components/loading-button";
import { toast } from "@/components/toast-wrapper";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authApi } from "@/lib/ky";
import { forgotPasswordSchema } from "@/lib/validations";

export const Route = createFileRoute("/(auth)/_auth/signin/forgot-password")({
  component: ForgotPasswordRC,
});

const forgotPasswordFn = async (values: ForgotPassword) => {
  await authApi.post("/forgot-password", {
    json: {
      email: values.email,
    },
  });
};

function ForgotPasswordRC() {
  const navigate = useNavigate();

  const form = useForm<ForgotPassword>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const clearAllErrors = () => {
    if (Object.keys(form.formState.errors).length > 0) {
      form.clearErrors();
    }
  };

  const { isPending, mutate } = useMutation({
    mutationFn: forgotPasswordFn,
    onSuccess: () => navigate({ to: "/check-email", search: { type: "forgot-password" } }),
    onError: (error) => {
      if (isHTTPError(error)) {
        toast.error("An error occurred!", {
          description: "Something went wrong. Please try again later.",
        });
      }
      toast.error("Network error", {
        description: "Could not reach the server! Check your connection.",
      });
    },
  });

  return (
    <div className="flex flex-col min-h-screen items-center justify-center sm:p-4">
      <Card className="w-full max-w-125 px-6 shadow-none sm:shadow-md">
        <div className="flex items-center justify-end">
          <Button variant="link" className="px-2" asChild>
            <Link to="/signin" search={{ redirect: "/dashboard" }}>
              <IconChevronLeft />
              Back to Login
            </Link>
          </Button>
        </div>
        <CardHeader className="px-0">
          <div className="space-y-2">
            <h1 className="font-serif font-bold text-2xl">Forgot your password?</h1>
            <p className="text-base text-muted-foreground">
              Provide the email you want to reset password.
            </p>
          </div>
        </CardHeader>
        <form onSubmit={form.handleSubmit((values) => mutate(values))}>
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Email</FieldLabel>
                  <Input
                    {...field}
                    onChange={(e) => {
                      clearAllErrors();
                      field.onChange(e);
                    }}
                    placeholder="user@example.com"
                    disabled={isPending}
                    autoComplete="off"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <LoadingButton
              type="submit"
              loading={isPending}
              disabled={isPending}
              className="w-full"
            >
              Send reset instructions
            </LoadingButton>
          </FieldGroup>
        </form>
      </Card>
    </div>
  );
}
