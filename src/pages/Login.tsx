import { FC } from "react";
import { config } from "../App/config";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from "react-use";
import {
  LogInMutationResponse,
  useLogInMutation,
} from "./logIn/useLogInMutation";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";
import { Stack } from "@mui/system";
import { LogInForm } from "./logIn/LogInForm";
import { ErrorModal } from "../ui-components/ErrorModal";
import Divider from "@mui/material/Divider";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

export const LogIn: FC = () => {
  const { routes } = config;
  const { palette } = useTheme();
  const navigate = useNavigate();
  const [, setUserData] = useLocalStorage<LogInMutationResponse>("userData");

  const logInMutation = useLogInMutation({
    onSuccess: (userData) => {
      setUserData(userData);
      navigate(routes.documents);
    },
  });

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
      sx={{ backgroundColor: palette.grey[100] }}
    >
      <Typography
        component="h1"
        variant="h3"
        color={palette.primary.main}
        fontWeight={700}
        position="fixed"
        left={0}
        top={0}
        margin={4}
      >
        DMS
      </Typography>
      <Paper elevation={4}>
        <Stack gap={1} padding={4}>
          <Typography display="h2" variant="h6">
            Logowanie
          </Typography>
          <Divider />
          <LogInForm mutation={logInMutation} />
        </Stack>
      </Paper>

      {logInMutation.isError && (
        <ErrorModal
          title="Logowanie nie powiodło się"
          description="Podano nieprawidłowe dane logowania."
        />
      )}
    </Box>
  );
};
