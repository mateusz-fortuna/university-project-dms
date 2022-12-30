import { FC } from "react";
import { RouterProvider } from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { router } from "./App/router";

const App: FC = () => {
  const queryClient = new QueryClient();

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
