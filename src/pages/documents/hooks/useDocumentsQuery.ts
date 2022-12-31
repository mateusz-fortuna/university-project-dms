import { useQuery } from "@tanstack/react-query";
import { Document } from "../../../mocks/responses/documentsQueryResponse";
import axios, { AxiosError } from "axios";

export const useDocumentsQuery = () => {
  const queryKey = ["documents"];
  const queryFn = async () => {
    const { data } = await axios.get("/document");
    return data;
  };

  return useQuery<Document[], AxiosError>(queryKey, queryFn);
};
