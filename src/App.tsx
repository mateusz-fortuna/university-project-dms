import { FC } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { Documents } from "./pages/Documents";
import { config } from "./app.config";
import { Login } from "./pages/Login";

const App: FC = () => {
  const { routes } = config;

  const router = createBrowserRouter([
    { path: "*", element: <Navigate to={routes.documents} /> },
    { path: routes.login, element: <Login /> },
    {
      path: routes.documents,
      element: <Documents />,
    },
  ]);

  return (
    <>
      <CssBaseline />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
