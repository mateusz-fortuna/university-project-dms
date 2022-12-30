import { FC } from "react";
import { config } from "../app.config";
import { Box, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { Credentials, useLogInMutation } from "./logIn/useLogInMutation";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { Stack } from "@mui/system";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import { LoadingButton } from "@mui/lab";

export const LogIn: FC = () => {
  const { routes } = config;
  const { control, handleSubmit } = useForm<Credentials>();
  const { palette } = useTheme();
  const navigate = useNavigate();

  const logInMutation = useLogInMutation({
    onSuccess: () => {
      navigate(routes.documents);
    },
  });

  const onSubmit = handleSubmit((form) => {
    logInMutation.mutate(form);
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
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": {
                width: "35ch",
                display: "flex",
              },
            }}
            noValidate
            autoComplete="off"
            onSubmit={onSubmit}
            marginTop={2}
          >
            <Stack gap={2}>
              <Controller
                control={control}
                name="username"
                rules={{
                  required: {
                    value: true,
                    message: "Nazwa użytkownika jest wymagana!",
                  },
                }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    label="Nazwa użytkownika"
                    error={Boolean(error)}
                    helperText={error?.message}
                  />
                )}
              />
              <Controller
                control={control}
                name="password"
                rules={{
                  required: { value: true, message: "Hasło jest wymagane!" },
                }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    label="Hasło"
                    error={Boolean(error)}
                    helperText={error?.message}
                  />
                )}
              />
              <LoadingButton
                type="submit"
                loading={logInMutation.isLoading}
                variant="contained"
                fullWidth
              >
                Zaloguj się
              </LoadingButton>
            </Stack>
          </Box>
        </Stack>
      </Paper>
    </Box>
  );
};
