import { zodResolver } from "@hookform/resolvers/zod";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { isHTTPError } from "ky";
import { useTransition } from "react";
import { Controller, useForm } from "react-hook-form";

import type { ApiErrorResponse, ApiResponse } from "@/lib/ky";
import type { SignUpValues } from "@/lib/validations";

import { LoadingButton } from "@/components/loading-button";
import { toast } from "@/components/toast-wrapper";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authApi } from "@/lib/ky";
import { registerSchema } from "@/lib/validations";
import { CardWrapper } from "@/routes/(auth)/-components/card-wrapper";
import { PasswordInput } from "@/routes/(auth)/-components/password-input";

export const Route = createFileRoute("/(auth)/signup/")({
  component: SignupRC,
  errorComponent: () => <div className="p-4">Something went wrong!</div>,
});

function SignupRC() {
  const [isPending, startTransition] = useTransition();
  const navigate = useNavigate();

  const form = useForm<SignUpValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const clearAllErrors = () => {
    if (Object.keys(form.formState.errors).length > 0) {
      form.clearErrors();
    }
  };

  const onSubmit = async (values: SignUpValues) => {
    startTransition(async () => {
      try {
        await authApi
          .post("register", {
            json: {
              firstName: values.firstname,
              lastName: values.lastname,
              email: values.email,
              password: values.password,
            },
            // credentials: "include",
          })
          .json<ApiResponse<{ id: string; surname: string }>>();

        form.reset();
        navigate({ to: "/signup/check-email" });
      } catch (error) {
        if (isHTTPError(error)) {
          const data = error.data as ApiErrorResponse;

          if (data?.error?.code === "DUPLICATE_EMAIL") {
            toast.error("Email already in use", {
              description:
                "An account with this email already exists. Please use a different email or sign in.",
            });
            return;
          }

          toast.error("Signup failed", {
            description: "Something went wrong. Please try again later.",
          });
          return;
        }

        toast.error("Network error", {
          description: "Could not reach the server. Please try again later.",
        });
      }
    });
  };

  return (
    <CardWrapper
      headerTitle="Create an account"
      headerLabel="Sandoxlabs"
      switchButtonLabel="Sign in"
      switchButtonHref="/signin"
      switchButtonDescription="Already have an account?"
    >
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FieldGroup>
          <div className="space-y-4">
            <div className="flexBetween gap-2 flex-col sm:flex-row space-y-4 sm:space-y-0">
              <div className="flex-1 w-full sm:w-auto">
                <Controller
                  name="firstname"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>First Name</FieldLabel>
                      <Input
                        {...field}
                        onChange={(event) => {
                          clearAllErrors();
                          field.onChange(event);
                        }}
                        placeholder="John"
                        disabled={isPending}
                        autoComplete="off"
                        aria-invalid={fieldState.invalid}
                      />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
              </div>
              <div className="flex-1 w-full sm:w-auto">
                <Controller
                  name="lastname"
                  control={form.control}
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid}>
                      <FieldLabel>Last Name</FieldLabel>
                      <Input
                        {...field}
                        onChange={(event) => {
                          clearAllErrors();
                          field.onChange(event);
                        }}
                        placeholder="Smith"
                        disabled={isPending}
                        autoComplete="off"
                        aria-invalid={fieldState.invalid}
                      />
                      {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                  )}
                />
              </div>
            </div>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Email</FieldLabel>
                  <Input
                    {...field}
                    onChange={(event) => {
                      clearAllErrors();
                      field.onChange(event);
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
              Create account
            </LoadingButton>
          </div>
        </FieldGroup>
      </form>
    </CardWrapper>
  );
}
