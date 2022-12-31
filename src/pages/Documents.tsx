import { Stack } from "@mui/system";
import { FC } from "react";
import { MiniDrawer } from "../layouts/MiniDrawer";
import { Loader } from "../ui-components/Loader";
import { useDocumentsQuery } from "./documents/hooks/useDocumentsQuery";

export const Documents: FC = () => {
  const documentsQuery = useDocumentsQuery();

  const isDataLoading = documentsQuery.isLoading;

  console.log(documentsQuery.data);

  return (
    <MiniDrawer title="Dokumenty w obiegu">
      {isDataLoading ? <Loader>Ładowanie danych...</Loader> : <Stack></Stack>}
    </MiniDrawer>
  );
};
