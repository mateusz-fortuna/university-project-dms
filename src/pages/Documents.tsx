import { FC } from "react";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { MainNavigation } from "../layouts/MainNavigation";
import { Loader } from "../ui-components/Loader";
import { useDocumentsQuery } from "./documents/hooks/useDocumentsQuery";
import { useDocumentRunStagesQuery } from "./documents/hooks/useDocumentRunStagesQuery";
import { useRegisteredUsersQuery } from "./documents/hooks/useRegisteredUsersQuery";
import { useDocumentRunsQuery } from "./documents/hooks/useDocumentRunsQuery";
import { useDocumentRunCategoriesQuery } from "./documents/hooks/useDocumentRunCategoriesQuery";
import { ErrorModal } from "../ui-components/ErrorModal";
import { CollapsableListButton } from "./documents/CollapsableListButton";
import { transformDocumentsData } from "./documents/helpers/transformDocumentsData";
import { DocumentsTable } from "./documents/DocumentsTable";
import RunIcon from "@mui/icons-material/UploadFile";
import HomeIcon from "@mui/icons-material/Home";

export const Documents: FC = () => {
  const documentsQuery = useDocumentsQuery();
  const documentRunsQuery = useDocumentRunsQuery();
  const documentRunStagesQuery = useDocumentRunStagesQuery();
  const documentRunCategoriesQuery = useDocumentRunCategoriesQuery();
  const registeredUsersQuery = useRegisteredUsersQuery();

  const isDataLoading =
    documentsQuery.isLoading ||
    documentRunsQuery.isLoading ||
    documentRunStagesQuery.isLoading ||
    documentRunCategoriesQuery.isLoading ||
    registeredUsersQuery.isLoading;

  const isNoData =
    !documentsQuery.data ||
    !documentRunsQuery.data ||
    !documentRunStagesQuery.data ||
    !documentRunCategoriesQuery.data ||
    !registeredUsersQuery.data;

  if (isDataLoading) {
    return (
      <MainNavigation title="Dokumenty w obiegu">
        <Loader>Ładowanie danych...</Loader>
      </MainNavigation>
    );
  }

  if (isNoData) {
    return (
      <MainNavigation title="Dokumenty w obiegu">
        <ErrorModal title="Dokumenty w obiegu" description="Brak danych" />
      </MainNavigation>
    );
  }

  const tableData = transformDocumentsData(
    documentsQuery.data,
    documentRunStagesQuery.data,
    registeredUsersQuery.data,
    documentRunsQuery.data
  );

  const renderFoldersTree = () => (
    <List>
      <ListItemButton>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Dokumenty" />
      </ListItemButton>
      <Box paddingLeft={2}>
        {documentRunCategoriesQuery.data.map((category) => (
          <CollapsableListButton key={category.id} title={category.name}>
            {documentRunsQuery.data
              .filter((run) => run.categoryId === category.id)
              .map((run) => (
                <ListItemButton key={run.id} sx={{ paddingLeft: 6 }}>
                  <ListItemIcon>
                    <RunIcon />
                  </ListItemIcon>
                  <ListItemText primary={run.name} />
                </ListItemButton>
              ))}
          </CollapsableListButton>
        ))}
      </Box>
    </List>
  );

  return (
    <MainNavigation title="Dokumenty w obiegu">
      <Box display="flex">
        {renderFoldersTree()}
        <Box width="100%" marginLeft={4}>
          <DocumentsTable data={tableData} />
        </Box>
      </Box>
    </MainNavigation>
  );
};
