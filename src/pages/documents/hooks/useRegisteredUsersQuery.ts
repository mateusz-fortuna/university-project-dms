import { useQuery } from "@tanstack/react-query";
import { RegisteredUser } from "../../../mocks/responses/registeredUsersQueryResponse";
import axios, { AxiosError } from "axios";

export const useRegisteredUsersQuery = () => {
  const queryKey = ["users"];
  const queryFn = async () => {
    const { data } = await axios.get("/users");
    return data;
  };

  return useQuery<RegisteredUser[], AxiosError>(queryKey, queryFn);
};
