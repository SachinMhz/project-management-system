/**
 * Application wide configuration.
 */
const config = {
  env: process.env.NODE_ENV,
  basename: process.env.REACT_APP_BASE_NAME,
  baseURL: process.env.REACT_APP_API_BASE_URL,
  sentryDSN: process.env.REACT_APP_SENTRY_DSN,
  endpoints: {
    auth: {
      login: "/auth/login",
      logout: "/auth/logout",
      refresh: "/auth/refresh",
      register: "/auth/register",
    },
    users: {
      users: "/users",
      user: "/admin/user",
      create: "/users/create",
      update: "/users/update",
      delete: "/users/delete",
    },
    employee: "/employees",
  },
};

export default config;
