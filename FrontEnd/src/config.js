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
      users: "/admin/users",
      user: "/admin/user",
      create: "/users/create",
      update: "/users/update",
      delete: "/users/delete",
      pm: "/admin/user-pm",
      tm: "/admin/user-tm",
      eng: "/admin/user-eng",
      onProject: "/admin/user-on-project",
      taggedOnTask: "/admin/users-tagged",
    },
    projects: {
      all: "/admin/projects",
      add: "/admin/projects-create",
      one: "/admin/project",
      addUser: "/admin/user-on-project",
    },
    tasks: {
      all: "/admin/tasks",
      add: "/admin/tasks-create",
      one: "/admin/task",
      addUser: "/admin/user-on-project",
    },
    comments: {
      all: "/admin/comments",
      one: "/admin/comment",
      add: "/admin/comments-create",
    },
    tags: {
      all: "/admin/tags",
      one: "/admin/tag",
      add: "/admin/tags-create",
    },
  },
};

export default config;
