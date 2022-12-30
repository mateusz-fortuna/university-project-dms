import { FC, PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { useLocalStorage } from "react-use";
import { config } from "../App/config";

export const RestrictedPage: FC<PropsWithChildren> = ({ children }) => {
  const [isUserLoggedIn] = useLocalStorage<string>("userToken");
  const { routes } = config;

  return isUserLoggedIn ? <>{children}</> : <Navigate to={routes.login} />;
};
