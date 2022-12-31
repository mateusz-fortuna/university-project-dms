import { context } from "msw";
import { nanoid } from "nanoid";
import { isEqual } from "lodash";
import {
  Credentials,
  LogInMutationResponse,
} from "../../pages/logIn/useLogInMutation";
import { registeredUsers } from "./registeredUsersQueryResponse";

export const logInMutationResponse = (credentials: Credentials) => {
  const userData = registeredUsers.find((user) =>
    isEqual(user.credentials, credentials)
  );

  if (userData) {
    return context.json<LogInMutationResponse>({
      ...userData,
      token: nanoid(),
    });
  }

  return context.status(404);
};
