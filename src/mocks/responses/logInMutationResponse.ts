import { context } from "msw";
import { nanoid } from "nanoid";
import { isEqual } from "lodash";
import {
  Credentials,
  LogInMutationResponse,
} from "../../pages/logIn/useLogInMutation";

export const validCredentials: Credentials[] = [
  { password: "admin", username: "admin" },
  { password: "user", username: "user" },
];

export const logInMutationResponse = (credentials: Credentials) => {
  const areCredentialsValid = validCredentials.some((validCredentials) =>
    isEqual(validCredentials, credentials)
  );

  if (areCredentialsValid) {
    return context.json<LogInMutationResponse>({ token: nanoid() });
  }

  return context.status(404);
};
