import { FC, useState } from "react";
import {
  Autocomplete,
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  TextField,
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
import { Document } from "../mocks/responses/documentsQueryResponse";
import RunIcon from "@mui/icons-material/UploadFile";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";

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

  const [selectedDocumentId, setSelectedDocumentId] =
    useState<Document["id"]>("");

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

  const renderSearchInput = () => {
    return (
      <Box width="300px" alignSelf="flex-end">
        <Autocomplete
          fullWidth
          freeSolo
          disableClearable
          options={documentsQuery.data.map((document) => document.internalId)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Wyszukaj dokument po numerze"
              InputProps={{
                ...params.InputProps,
                type: "search",
                endAdornment: <SearchIcon />,
              }}
            />
          )}
        />
      </Box>
    );
  };

  return (
    <MainNavigation title="Dokumenty w obiegu">
      <Box display="flex">
        {renderFoldersTree()}
        <Stack gap={4} marginLeft={4}>
          {renderSearchInput()}
          <Box width="100%" marginRight={4}>
            <DocumentsTable
              data={tableData}
              selectedDocumentId={selectedDocumentId}
              setSelectedDocumentId={setSelectedDocumentId}
            />
          </Box>
        </Stack>
      </Box>
    </MainNavigation>
  );
};
