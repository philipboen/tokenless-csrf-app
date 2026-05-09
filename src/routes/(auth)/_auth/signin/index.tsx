import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { isHTTPError } from "ky";
import { Controller, useForm } from "react-hook-form";

import type { LoginValues } from "@/lib/validations";

import { LoadingButton } from "@/components/loading-button";
import { toast } from "@/components/toast-wrapper";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authApi } from "@/lib/ky";
import { loginSchema } from "@/lib/validations";
import { CardWrapper } from "@/routes/(auth)/-components/card-wrapper";
import { PasswordInput } from "@/routes/(auth)/-components/password-input";
import { useAuthStore } from "@/stores/authStore";

export const Route = createFileRoute("/(auth)/_auth/signin/")({
  validateSearch: (search) => ({
    redirect: search.redirect as string | undefined,
  }),
  component: SigninRC,
});

const loginMutationFn = async (values: LoginValues) => {
  await authApi.post("/login", {
    json: {
      email: values.email,
      password: values.password,
    },
  });
  // update Zustand store after login
  await useAuthStore.getState().fetchAuthState();
};

function SigninRC() {
  const navigate = useNavigate();
  const { redirect } = Route.useSearch();

  const form = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const clearAllErrors = () => {
    if (Object.keys(form.formState.errors).length > 0) {
      form.clearErrors();
    }
  };

  const { isPending, mutate } = useMutation({
    mutationFn: loginMutationFn,
    onSuccess: () => {
      const redirectTo =
        redirect && typeof redirect === "string" && redirect.startsWith("/")
          ? redirect
          : "/dashboard";
      navigate({ to: redirectTo });
    },
    onError: (error) => {
      if (isHTTPError(error)) {
        const code = (error as any).data?.error?.code;
        if (code === "INVALID_CREDENTIALS") return toast.error("Invalid email or password");
        if (code === "EMAIL_NOT_VERIFIED") {
          return navigate({ to: "/check-email", search: { type: "account-creation" } });
        }
      }
      toast.error("Network error", {
        description: "Could not reach the server! Check your connection.",
      });
    },
  });

  return (
    <CardWrapper
      headerTitle="Sign in"
      headerLabel="Sandoxlabs"
      switchButtonLabel="Sign up"
      switchButtonHref="/signup"
      switchButtonDescription="Don't have an account?"
    >
      <form onSubmit={form.handleSubmit((values) => mutate(values))}>
        <FieldGroup>
          <div className="space-y-4">
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
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel>Password</FieldLabel>
                  <PasswordInput
                    {...field}
                    onChange={(e) => {
                      clearAllErrors();
                      field.onChange(e);
                    }}
                    placeholder="Enter password"
                    disabled={isPending}
                    autoComplete="off"
                    aria-invalid={fieldState.invalid}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
            <div className="flex justify-end">
              <Button variant="link" className="px-0 text-right" asChild>
                <Link to="/forgot-password">Forgot password?</Link>
              </Button>
            </div>
            <LoadingButton
              type="submit"
              loading={isPending}
              disabled={isPending}
              className="w-full"
            >
              Login
            </LoadingButton>
          </div>
        </FieldGroup>
      </form>
    </CardWrapper>
  );
}
