import { useQuery } from "@tanstack/react-query";
import { DocumentRunStage } from "../../../mocks/responses/documentRunStagesQueryResponse";
import axios, { AxiosError } from "axios";

export const useDocumentRunStagesQuery = () => {
  const queryKey = ["document", "run", "stage"];
  const queryFn = async () => {
    const { data } = await axios.get("/document/run/stage");
    return data;
  };

  return useQuery<DocumentRunStage[], AxiosError>(queryKey, queryFn);
};
