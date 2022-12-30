import { FC } from "react";
import { useLocalStorage } from "react-use";
import { useLogInMutation } from "./logIn/useLogInMutation";
import { useTheme } from "@mui/material/styles";
import { Box } from "@mui/material";
import { Stack } from "@mui/system";
import { LogInForm } from "./logIn/LogInForm";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { useNavigate } from "react-router-dom";
import { config } from "../app.config";

export const LogIn: FC = () => {
  const { routes } = config;
  const { palette } = useTheme();
  const navigate = useNavigate();
  const [, setUserToken] = useLocalStorage<string>("userToken");

  const logInMutation = useLogInMutation({
    onSuccess: ({ token }) => {
      setUserToken(token);
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
    </Box>
  );
};
