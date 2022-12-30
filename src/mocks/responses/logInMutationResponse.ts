import { context } from "msw";
import { nanoid } from "nanoid";
import { isEqual } from "lodash";
import {
  Credentials,
  LogInMutationResponse,
} from "../../pages/logIn/useLogInMutation";

export type Role = "admin" | "user" | "guest";

export interface RegisteredUser {
  id: string;
  name: string;
  surname: string;
  credentials: Credentials;
  role: Role;
}

export const registeredUsers: RegisteredUser[] = [
  {
    id: "1",
    name: "Jan",
    surname: "Kowalski",
    credentials: { password: "admin", username: "admin" },
    role: "admin",
  },
  {
    id: "2",
    name: "Marek",
    surname: "Nowak",
    credentials: { password: "user", username: "user" },
    role: "user",
  },
];

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
