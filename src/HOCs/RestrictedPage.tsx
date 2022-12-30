import { FC, PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";
import { useLocalStorage } from "react-use";
import { config } from "../App/config";
import { Role } from "../mocks/responses/logInMutationResponse";
import { LogInMutationResponse } from "../pages/logIn/useLogInMutation";

interface RestrictedPageProps extends PropsWithChildren {
  allowedRoles: Role[];
}

export const RestrictedPage: FC<RestrictedPageProps> = ({
  allowedRoles,
  children,
}) => {
  const [userData] = useLocalStorage<LogInMutationResponse>("userData");
  const { routes } = config;

  if (!userData) {
    return <Navigate to={routes.login} />;
  }

  const isUserAllowed = allowedRoles.some((role) => role === userData.role);

  if (isUserAllowed) {
    return <>{children}</>;
  }

  return <Navigate to={routes.login} />;
};
