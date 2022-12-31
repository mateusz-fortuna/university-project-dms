import { useQuery } from "@tanstack/react-query";
import { Document } from "../../../mocks/responses/documentsQueryResponse";
import axios, { AxiosError } from "axios";

export const useRegisteredUsersQuery = () => {
  const queryKey = ["users"];
  const queryFn = async () => {
    const { data } = await axios.get("/users");
    return data;
  };

  return useQuery<Document[], AxiosError>(queryKey, queryFn);
};
