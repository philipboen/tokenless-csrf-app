import { zodResolver } from "@hookform/resolvers/zod";
import { IconChevronLeft } from "@tabler/icons-react";
import { useMutation } from "@tanstack/react-query";
import { Link, useNavigate } from "@tanstack/react-router";
import { isHTTPError } from "ky";
import { Controller, useForm } from "react-hook-form";

import type { AppHTTPError } from "@/lib/ky";
import type { ResetPasswordValues } from "@/lib/validations";

import { LoadingButton } from "@/components/loading-button";
import { toast } from "@/components/toast-wrapper";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { authApi } from "@/lib/ky";
import { resetPasswordSchema } from "@/lib/validations";
import { PasswordInput } from "@/routes/(auth)/-components/password-input";

export const ResetPasswordComponent = ({ token }: { token: string }) => {
  const navigate = useNavigate();
  const resetPasswordMutationFn = async (values: ResetPasswordValues) => {
    await authApi.post("forgot-password/reset", {
      json: {
        token,
        newPassword: values.password,
      },
    });
  };

  const form = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const clearAllErrors = () => {
    if (Object.keys(form.formState.errors).length > 0) {
      form.clearErrors();
    }
  };

  const { isPending, mutate } = useMutation({
    mutationFn: resetPasswordMutationFn,
    onSuccess: () => {
      toast.success("Password reset successful", {
        description: "Kindly use your new password to sign in",
      });

      navigate({
        to: "/signin",
        search: { redirect: "/dashboard" },
        replace: true,
      });
    },
    onError: (error) => {
      if (isHTTPError(error)) {
        const code = (error as AppHTTPError).data?.error?.code;
        if (code === "INVALID_TOKEN") {
          return toast.error("Reset password link has just expired", {
            description:
              "You took too long to reset the password. Return to the forgot password page to request a new one.",
          });
        }

        toast.error("Signup failed", {
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
      <Card className="w-full max-w-xl px-0 sm:px-4 ring-0 sm:ring-1 max-2xl:mx-auto shadow-none sm:shadow-md">
        <div className="flex items-center justify-end">
          <Button variant="link" className="px-2" asChild>
            <Link to="/signin" search={{ redirect: "/dashboard" }}>
              <IconChevronLeft />
              Back to Login
            </Link>
          </Button>
        </div>
        <CardHeader className="px-0">
          <div className="w-full space-y-2">
            <h1 className="font-serif font-bold text-3xl">Reset your password</h1>
            <p className="text-base text-muted-foreground">Enter your new password below</p>
          </div>
        </CardHeader>
        <form onSubmit={form.handleSubmit((values) => mutate(values))}>
          <FieldGroup>
            <div className="space-y-4">
              <Controller
                name="password"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Password</FieldLabel>
                    <PasswordInput
                      {...field}
                      onChange={(event) => {
                        clearAllErrors();
                        field.onChange(event);
                      }}
                      disabled={isPending}
                      placeholder="Enter password"
                      autoComplete="off"
                      aria-invalid={fieldState.invalid}
                    />

                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                  </Field>
                )}
              />
              <Controller
                name="confirmPassword"
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel>Confirm Password</FieldLabel>
                    <PasswordInput
                      {...field}
                      onChange={(event) => {
                        clearAllErrors();
                        field.onChange(event);
                      }}
                      disabled={isPending}
                      placeholder="Repeat password"
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
                Reset Password
              </LoadingButton>
            </div>
          </FieldGroup>
        </form>
      </Card>
    </div>
  );
};
