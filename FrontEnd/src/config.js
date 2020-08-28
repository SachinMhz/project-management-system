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
      user: "/user",
      update: "/admin/users-update",
      delete: "/admin/users-delete",
      pm: "/user-pm",
      tm: "/user-tm",
      eng: "/user-eng",
      onProject: "/user-on-project",
      taggedOnTask: "/users-tagged",
    },
    projects: {
      all: "/projects",
      add: "/admin/projects-create",
      one: "/project",
      addUser: "/user-on-project",
      update: "/projects-update",
      delete: "/admin/projects-delete",
      enrolledByUser: "/projects-enrolled-by-user"
    },
    tasks: {
      all: "/tasks",
      add: "/tasks-create",
      one: "/task",
      addUser: "/user-on-project",
      delete: "/tasks-delete",
      update: "/tasks-update",
    },
    comments: {
      all: "/comments",
      one: "/comment",
      add: "/comments-create",
      delete: "/comments-delete",
      update: "/comments-update",
    },
    tags: {
      all: "/tags",
      one: "/tag",
      add: "/tags-create",
      taggedUser: "/tags-users",
    },
  },
};

export default config;
