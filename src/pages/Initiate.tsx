import {
  Box,
  Button,
  Checkbox,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
  TextField,
} from "@mui/material";
import { FC, useState } from "react";
import { MainNavigation } from "../layouts/MainNavigation";
import { ErrorModal } from "../ui-components/ErrorModal";
import { Loader } from "../ui-components/Loader";
import { useDocumentRunsQuery } from "./documents/hooks/useDocumentRunsQuery";
import { useDocumentRunStagesQuery } from "./documents/hooks/useDocumentRunStagesQuery";
import { MoreVert } from "@mui/icons-material";
import { DocumentRun } from "../mocks/responses/documentRunsQueryResponse";
import { Controller, useForm } from "react-hook-form";
import AddIcon from "@mui/icons-material/Add";

export const Initiate: FC = () => {
  const [checkedRun, setCheckedRun] = useState<Array<DocumentRun["id"]>>([]);
  const { control } = useForm();
  const documentRunsQuery = useDocumentRunsQuery();
  const documentRunStagesQuery = useDocumentRunStagesQuery();

  const isDataLoading =
    documentRunsQuery.isLoading || documentRunStagesQuery.isLoading;

  if (isDataLoading) {
    return (
      <MainNavigation title="Inicjowanie obiegu">
        <Loader>Ładowanie danych...</Loader>
      </MainNavigation>
    );
  }

  const isNoData = !documentRunsQuery.data || !documentRunStagesQuery.data;

  if (isNoData) {
    return (
      <MainNavigation title="Inicjowanie obiegu">
        <ErrorModal title="Inicjowanie obiegu" description="Brak danych" />
      </MainNavigation>
    );
  }

  const handleToggle = (value: DocumentRun["id"]) => () => {
    const currentIndex = checkedRun.indexOf(value);
    const newChecked = [...checkedRun];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setCheckedRun(newChecked);
  };

  const renderCreatedDocumentRuns = () => {
    return (
      <Stack>
        <Typography component="h3" variant="h6">
          Utworzone obiegi
        </Typography>
        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",
          }}
        >
          {documentRunsQuery.data.map((run) => (
            <Box
              key={`run-list-item-${run.id}`}
              paddingBottom={1}
              marginBottom={1}
              borderBottom="1px solid rgba(0, 0, 0, 0.12)"
            >
              <ListItem
                secondaryAction={
                  <IconButton edge="end">
                    <MoreVert />
                  </IconButton>
                }
                disablePadding
              >
                <ListItemButton
                  role={undefined}
                  onClick={handleToggle(run.id)}
                  dense
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={checkedRun.includes(run.id)}
                      tabIndex={-1}
                      disableRipple
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <span>
                        <b>{run.name}</b>
                      </span>
                    }
                  />
                </ListItemButton>
              </ListItem>

              {documentRunStagesQuery.data
                .filter((runStage) => runStage.runId === run.id)
                .map((stage) => (
                  <ListItem
                    key={`stage-list-item-${stage.id}`}
                    sx={{ paddingLeft: 4 }}
                  >
                    <ListItemText primary={stage.name} />
                  </ListItem>
                ))}
            </Box>
          ))}
        </List>
      </Stack>
    );
  };

  const renderInitiateDocumentRunForm = () => {
    return (
      <Stack gap={4}>
        <Box>
          <Button variant="contained">
            <AddIcon />
            <Typography marginLeft={1}>Zainicjuj obieg</Typography>
          </Button>
        </Box>
        <Controller
          control={control}
          name="runName"
          render={({ field }) => <TextField {...field} label="Nazwa obiegu" />}
        />
        <Box display="flex" gap={2} alignItems="center">
          <Controller
            control={control}
            name="stageName"
            render={({ field }) => <TextField {...field} label="Nazwa etapu" />}
          />
          <Controller
            control={control}
            name="stageStatus"
            render={({ field }) => (
              <TextField {...field} label="Status etapu" />
            )}
          />
          <Box>
            <Button>
              <AddIcon />
              <Typography marginLeft={1}>Dodaj etap</Typography>
            </Button>
          </Box>
        </Box>
      </Stack>
    );
  };

  return (
    <MainNavigation title="Inicjowanie obiegu">
      <Box display="flex" gap={4} padding={4}>
        {renderCreatedDocumentRuns()}
        {renderInitiateDocumentRunForm()}
      </Box>
    </MainNavigation>
  );
};
