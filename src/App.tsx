import { FC } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { loggedUserRoutes, guestRoutes } from "./app/routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const App: FC = () => {
  const queryClient = new QueryClient();
  const isUserLoggedIn = false;

  const router = createBrowserRouter(
    isUserLoggedIn ? loggedUserRoutes : guestRoutes
  );

  return (
    <>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </>
  );
};

export default App;
