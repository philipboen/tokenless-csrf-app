import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { isHTTPError } from "ky";
import { Controller, useForm } from "react-hook-form";

import type { SignUpValues } from "@/lib/validations";

import { LoadingButton } from "@/components/loading-button";
import { toast } from "@/components/toast-wrapper";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authApi } from "@/lib/ky";
import { registerSchema } from "@/lib/validations";
import { CardWrapper } from "@/routes/(auth)/-components/card-wrapper";
import { PasswordInput } from "@/routes/(auth)/-components/password-input";

export const Route = createFileRoute("/(auth)/_auth/signup/")({
  component: SignupRC,
});

const registerMutationFn = async (values: SignUpValues) => {
  await authApi.post("register", {
    json: {
      firstName: values.firstname,
      lastName: values.lastname,
      email: values.email,
      password: values.password,
    },
  });
};

function SignupRC() {
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

  const { isPending, mutate } = useMutation({
    mutationFn: registerMutationFn,
    onSuccess: () => navigate({ to: "/check-email", search: { type: "account-creation" } }),
    onError: (error) => {
      if (isHTTPError(error)) {
        const code = (error as any).data?.error?.code;
        if (code === "DUPLICATE_EMAIL") {
          return toast.error("Email already in use", {
            description: "An account with this email already exists.",
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
    <CardWrapper
      headerTitle="Create an account"
      headerLabel="Sandoxlabs"
      switchButtonLabel="Sign in"
      switchButtonHref="/signin"
      switchButtonDescription="Already have an account?"
    >
      <form onSubmit={form.handleSubmit((values) => mutate(values))}>
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
