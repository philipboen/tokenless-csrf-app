import type { HTTPError } from "ky";

import ky, { isHTTPError } from "ky";

export interface ApiResponse<T = unknown> {
  data: T;
}

export interface ApiErrorResponse {
  error: {
    code: string;
    message: string;
  };
}

export interface AppHTTPError extends HTTPError {
  data: ApiErrorResponse | undefined;
}

const api = ky.create({
  baseUrl: import.meta.env.VITE_API_URL,
  credentials: "include",
  headers: {
    "content-type": "application/json",
  },
  hooks: {
    beforeError: [
      ({ error }) => {
        if (isHTTPError(error)) {
          // error.data is already parsed by ky as `unknown`.
          // Cast to AppHTTPError to narrow the type — no re-reading the body.
          (error as AppHTTPError).data =
            typeof error.data === "object" && error.data !== null && "error" in error.data
              ? (error.data as ApiErrorResponse)
              : undefined;
        }
        return error;
      },
    ],
  },
});

const authApi = api.extend({ prefix: "auth" });

export { api, authApi, isHTTPError };
