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
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { transformDocumentsData } from "./documents/helpers/transformDocumentsData";
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

  const columns: GridColDef[] = [
    { field: "internalId", headerName: "Numer", width: 130 },
    { field: "runName", headerName: "Nazwa obiegu", width: 130 },
    { field: "stageName", headerName: "Nazwa etapu", width: 200 },
    { field: "lastRunAt", headerName: "Data przekazania", width: 130 },
    { field: "stageStatus", headerName: "Status", width: 130 },
    { field: "assignee", headerName: "Osoba przypisana", width: 150 },
  ];

  /*  const tableWidth = columns
    .map((columns) => columns.width ?? 0)
    .reduce((sum, currentColumnWidth) => sum + currentColumnWidth); */

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
          <DataGrid autoHeight columns={columns} rows={tableData} />
        </Box>
      </Box>
    </MainNavigation>
  );
};
