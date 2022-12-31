import { useQuery } from "@tanstack/react-query";
import { DocumentRun } from "../../../mocks/responses/documentRunsQueryResponse";
import axios, { AxiosError } from "axios";

export const useDocumentRunsQuery = () => {
  const queryKey = ["document", "run"];
  const queryFn = async () => {
    const { data } = await axios.get("/document/run");
    return data;
  };

  return useQuery<DocumentRun[], AxiosError>(queryKey, queryFn);
};
