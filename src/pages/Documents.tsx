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
import RunIcon from "@mui/icons-material/UploadFile";
import HomeIcon from "@mui/icons-material/Home";
import { nanoid } from "nanoid";

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
        <ErrorModal title="Ładowanie daych" description="Brak danych" />
      </MainNavigation>
    );
  }

  const tableData = documentsQuery.data.map(
    ({ internalId, history, authorId }) => {
      const stageId = history[0].stageId;
      const stage = documentRunStagesQuery.data.find(
        (stage) => stage.id === stageId
      );

      if (!stage) {
        return {
          id: nanoid(),
          internalId,
          runName: "-",
          stageName: "-",
          lastRunAt: "-",
          stageStatus: "-",
          assignee:
            registeredUsersQuery.data.find((user) => user.id === authorId)
              ?.name ?? "-",
        };
      }

      const run = documentRunsQuery.data.find((run) => run.id === stage.runId);

      return {
        id: nanoid(),
        internalId,
        runName: run?.name ?? "-",
        stageName: stage.name,
        lastRunAt: history[history.length - 1].createdAt,
        stageStatus:
          run?.stages?.find((runStage) => runStage.id === stage.id) ?? "-",
        assignee:
          registeredUsersQuery.data.find((user) => user.id === authorId)
            ?.name ?? "-",
      };
    }
  );

  const columns: GridColDef[] = [{ field: "internalId", headerName: "Numer" }];

  console.log(
    tableData,
    documentsQuery.data,
    documentRunsQuery.data,
    documentRunStagesQuery.data,
    documentRunCategoriesQuery.data,
    registeredUsersQuery.data
  );

  const renderFoldersTree = () => (
    <List>
      <ListItemButton>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Dokumenty" />
      </ListItemButton>
      <Box paddingLeft={4}>
        {documentRunCategoriesQuery.data.map((category) => (
          <CollapsableListButton key={category.id} title={category.name}>
            {documentRunsQuery.data
              .filter((run) => run.categoryId === category.id)
              .map((run) => (
                <ListItemButton key={run.id} sx={{ paddingLeft: 4 }}>
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
        <Box height="500px">
          <DataGrid columns={columns} rows={tableData} />
        </Box>
      </Box>
    </MainNavigation>
  );
};
