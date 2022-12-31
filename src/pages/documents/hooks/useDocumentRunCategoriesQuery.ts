import { useQuery } from "@tanstack/react-query";
import { DocumentRunStage } from "../../../mocks/responses/documentRunStagesQueryResponse";
import axios, { AxiosError } from "axios";

export const useDocumentRunCategoriesQuery = () => {
  const queryKey = ["document", "run", "categories"];
  const queryFn = async () => {
    const { data } = await axios.get("/document/run/categories");
    return data;
  };

  return useQuery<DocumentRunStage[], AxiosError>(queryKey, queryFn);
};
