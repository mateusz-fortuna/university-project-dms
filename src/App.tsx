// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { FC } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Documents } from "./pages/Documents";

const App: FC = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Documents />,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
