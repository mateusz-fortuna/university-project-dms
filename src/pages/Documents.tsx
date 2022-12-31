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

  console.log(
    documentsQuery.data,
    documentRunsQuery.data,
    documentRunStagesQuery.data,
    documentRunCategoriesQuery.data,
    registeredUsersQuery.data
  );

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

  return (
    <MainNavigation title="Dokumenty w obiegu">
      <Box display="flex">
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
      </Box>
    </MainNavigation>
  );
};
