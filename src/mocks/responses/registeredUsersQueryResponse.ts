import { context } from "msw";
import { config } from "../../App/config";
import { Credentials } from "../../pages/logIn/useLogInMutation";

export interface RegisteredUser {
  id: string;
  name: string;
  surname: string;
  credentials: Credentials;
  role: typeof config.roles[number];
}

export const registeredUsers: RegisteredUser[] = [
  {
    id: "1",
    name: "Jan",
    surname: "Kowalski",
    credentials: { password: "admin", username: "admin" },
    role: "ADMIN",
  },
  {
    id: "2",
    name: "Marek",
    surname: "Nowak",
    credentials: { password: "user", username: "user" },
    role: "USER",
  },
];

export const registeredUsersQueryResponse = () => {
  return context.json(registeredUsers);
};
