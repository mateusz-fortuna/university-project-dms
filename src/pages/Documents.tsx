import { FC } from "react";
import { Box } from "@mui/material";
import { MainNavigation } from "../layouts/MainNavigation";
import { Loader } from "../ui-components/Loader";
import { useDocumentsQuery } from "./documents/hooks/useDocumentsQuery";

export const Documents: FC = () => {
  const documentsQuery = useDocumentsQuery();

  const isDataLoading = documentsQuery.isLoading;

  console.log(documentsQuery.data);

  return (
    <MainNavigation title="Dokumenty w obiegu">
      {isDataLoading ? (
        <Loader>Ładowanie danych...</Loader>
      ) : (
        <Box display="flex"></Box>
      )}
    </MainNavigation>
  );
};
