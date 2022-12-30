// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { FC } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { Documents } from "./pages/Documents";
import { config } from "./app.config";

const App: FC = () => {
  const { routes } = config;

  const router = createBrowserRouter([
    { path: "*", element: <Navigate to={routes.documents} /> },
    {
      path: "/" + routes.documents,
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
