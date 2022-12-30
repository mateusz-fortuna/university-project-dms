import { config } from "./config";
import { createBrowserRouter, Navigate } from "react-router-dom";
import { RestrictedPage } from "../HOCs/RestrictedPage";
import { Documents } from "../pages/Documents";
import { LogIn } from "../pages/LogIn";
import { DocumentsManager } from "../pages/DocumentsManager";
import { Initiate } from "../pages/Initiate";
import { Scan } from "../pages/Scan";
import { AdminPanel } from "../pages/AdminPanel";

const { routes } = config;

export const router = createBrowserRouter([
  {
    path: "*",
    element: <Navigate to={routes.documents} />,
  },
  { path: routes.login, element: <LogIn /> },
  {
    path: routes.documents,
    element: (
      <RestrictedPage allowedRoles={["admin", "user"]}>
        <Documents />
      </RestrictedPage>
    ),
  },
  {
    path: routes.documentsManager,
    element: (
      <RestrictedPage allowedRoles={["admin", "user"]}>
        <DocumentsManager />
      </RestrictedPage>
    ),
  },
  {
    path: routes.initiate,
    element: (
      <RestrictedPage allowedRoles={["admin", "user"]}>
        <Initiate />
      </RestrictedPage>
    ),
  },
  {
    path: routes.scan,
    element: (
      <RestrictedPage allowedRoles={["admin", "user"]}>
        <Scan />
      </RestrictedPage>
    ),
  },
  {
    path: routes.organization,
    element: (
      <RestrictedPage allowedRoles={["admin", "user"]}>
        <Documents />
      </RestrictedPage>
    ),
  },
  {
    path: routes.adminPanel,
    element: (
      <RestrictedPage allowedRoles={["admin"]}>
        <AdminPanel />
      </RestrictedPage>
    ),
  },
]);
