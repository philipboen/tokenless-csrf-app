import ky from "ky";

export interface ApiResponse<T = unknown> {
  data: T;
}

export interface ApiErrorResponse {
  error: {
    code: string;
    message: string;
  };
}

const api = ky.create({
  baseUrl: import.meta.env.VITE_API_URL,
});

const authApi = api.extend((options) => ({
  // eslint-disable-next-line prefer-template
  prefix: `${options.prefix ? options.prefix + "/" : ""}auth`,
}));

export { api, authApi };
