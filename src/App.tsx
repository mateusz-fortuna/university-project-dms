import { FC } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { loggedUserRoutes, guestRoutes } from "./app/routes";

const App: FC = () => {
  const isUserLoggedIn = false;

  const router = createBrowserRouter(
    isUserLoggedIn ? loggedUserRoutes : guestRoutes
  );

  return (
    <>
      <CssBaseline />
      <RouterProvider router={router} />
    </>
  );
};

export default App;
