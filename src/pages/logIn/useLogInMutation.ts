import axios, { AxiosError } from "axios";
import { UseMutationOptions } from "@tanstack/react-query/build/lib/types";
import { useMutation } from "@tanstack/react-query";
import { RegisteredUser } from "../../mocks/responses/logInMutationResponse";

export interface Credentials {
  username: string;
  password: string;
}

export interface LogInMutationResponse extends RegisteredUser {
  token: string;
}

export const useLogInMutation = (
  opts?: UseMutationOptions<LogInMutationResponse, AxiosError, Credentials>
) => {
  const mutationKey = ["logIn"];

  const mutationFn = async (credentials: Credentials) => {
    const { data } = await axios.post("/login", credentials);
    return data;
  };

  return useMutation<LogInMutationResponse, AxiosError, Credentials>(
    mutationKey,
    mutationFn,
    opts
  );
};
