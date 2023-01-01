import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Stack,
  Autocomplete,
  TextField,
  Typography,
  useTheme,
  Divider,
  MenuItem,
  MenuList,
  Paper,
} from "@mui/material";
import { FC, useState } from "react";
import { MainNavigation } from "../layouts/MainNavigation";
import { ErrorModal } from "../ui-components/ErrorModal";
import { Loader } from "../ui-components/Loader";
import { CollapsableListButton } from "./documents/CollapsableListButton";
import { useDocumentRunCategoriesQuery } from "./documents/hooks/useDocumentRunCategoriesQuery";
import { useDocumentRunsQuery } from "./documents/hooks/useDocumentRunsQuery";
import { useDocumentRunStagesQuery } from "./documents/hooks/useDocumentRunStagesQuery";
import { useDocumentsQuery } from "./documents/hooks/useDocumentsQuery";
import { useRegisteredUsersQuery } from "./documents/hooks/useRegisteredUsersQuery";
import { Document } from "../mocks/responses/documentsQueryResponse";
import FolderIcon from "@mui/icons-material/Folder";
import SearchIcon from "@mui/icons-material/Search";
import FileIcon from "@mui/icons-material/Description";
import {
  ContentCut,
  ContentCopy,
  ContentPaste,
  Cloud,
} from "@mui/icons-material";
export const DocumentsManager: FC = () => {
  const { palette } = useTheme();
  const [selectedDocumentId, setSelectedDocumentId] =
    useState<Document["id"]>("1");

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
      <MainNavigation title="Manager dokumentów">
        <Loader>Ładowanie danych...</Loader>
      </MainNavigation>
    );
  }

  if (isNoData) {
    return (
      <MainNavigation title="Manager dokumentów">
        <ErrorModal title="Manager dokumentów" description="Brak danych" />
      </MainNavigation>
    );
  }

  const renderFoldersTree = () => (
    <List
      sx={{
        borderRight: "1px solid rgba(0, 0, 0, 0.12)",
        minWidth: 380,
        height: "calc(100vh - 64px)",
      }}
    >
      <ListItemButton>
        <ListItemIcon>
          <FolderIcon />
        </ListItemIcon>
        <ListItemText primary="Dokumenty" />
      </ListItemButton>
      <Box paddingLeft={2}>
        <CollapsableListButton title="Marek Nowak" icon={<FolderIcon />}>
          <ListItemButton sx={{ paddingLeft: 6 }} selected>
            <ListItemIcon>
              <FolderIcon />
            </ListItemIcon>
            <ListItemText primary="Zgłoszenia" />
          </ListItemButton>
        </CollapsableListButton>
        <CollapsableListButton title="Jan Kolwalski" icon={<FolderIcon />}>
          <ListItemButton sx={{ paddingLeft: 6 }}>
            <ListItemIcon>
              <FolderIcon />
            </ListItemIcon>
            <ListItemText primary="Faktury" />
          </ListItemButton>
        </CollapsableListButton>
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
          options={documentsQuery.data.map((document) => document.name)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Wyszukaj dokument po nazwie"
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

  const renderContextMenu = () => {
    return (
      <Paper
        sx={{
          width: 275,
          maxWidth: "100%",
          marginLeft: "1rem",
          marginTop: "1rem",
        }}
      >
        <MenuList>
          <MenuItem>
            <ListItemIcon>
              <ContentCut fontSize="small" />
            </ListItemIcon>
            <ListItemText>Cut</ListItemText>
            <Typography variant="body2" color="text.secondary">
              ctrl+X
            </Typography>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <ContentCopy fontSize="small" />
            </ListItemIcon>
            <ListItemText>Copy</ListItemText>
            <Typography variant="body2" color="text.secondary">
              ctrl+C
            </Typography>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <ContentPaste fontSize="small" />
            </ListItemIcon>
            <ListItemText>Paste</ListItemText>
            <Typography variant="body2" color="text.secondary">
              ctrl+V
            </Typography>
          </MenuItem>
          <Divider />
          <MenuItem>
            <ListItemIcon>
              <Cloud fontSize="small" />
            </ListItemIcon>
            <ListItemText>Web Clipboard</ListItemText>
          </MenuItem>
        </MenuList>
      </Paper>
    );
  };

  const renderFiles = () => {
    return (
      <Box display="flex" gap={4}>
        {documentsQuery.data
          .filter(({ authorId }) => authorId === "1")
          .map((document) => (
            <Stack key={document.id}>
              <Stack
                onClick={() => setSelectedDocumentId(document.id)}
                alignItems="center"
                padding={2}
                borderRadius={1}
                border={`1px solid rgba(0, 0, 0, ${
                  selectedDocumentId === document.id ? 0.12 : 0
                })`}
                sx={
                  selectedDocumentId === document.id
                    ? { backgroundColor: palette.grey[200] }
                    : undefined
                }
              >
                <FileIcon sx={{ fontSize: "4rem" }} />
                <Typography>{document.name}</Typography>
              </Stack>
              {selectedDocumentId === document.id && renderContextMenu()}
            </Stack>
          ))}
      </Box>
    );
  };

  return (
    <MainNavigation title="Manager dokumentów">
      <Box display="flex">
        {renderFoldersTree()}
        <Stack gap={4} padding={4} width="100%">
          {renderSearchInput()}
          {renderFiles()}
        </Stack>
      </Box>
    </MainNavigation>
  );
};
