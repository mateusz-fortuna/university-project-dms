export const config = {
  routes: {
    login: "/login",
    documents: "/documents",
    documentsManager: "/documentsManager",
    initiate: "/initiate",
    scan: "/scan",
    organization: "/organization",
    adminPanel: "/adminPanel",
  },
  roles: ["ADMIN", "USER", "GUEST"],
} as const;
