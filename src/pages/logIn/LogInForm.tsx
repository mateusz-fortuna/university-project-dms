import { FC } from "react";
import { LoadingButton } from "@mui/lab";
import { Box, Stack, TextField } from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { Credentials, useLogInMutation } from "./useLogInMutation";

interface LogInFormProps {
  mutation: ReturnType<typeof useLogInMutation>;
}

export const LogInForm: FC<LogInFormProps> = ({ mutation }) => {
  const { control, handleSubmit } = useForm<Credentials>();

  const onSubmit = handleSubmit((form) => {
    mutation.mutate(form);
  });

  return (
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
          loading={mutation.isLoading}
          variant="contained"
          fullWidth
        >
          Zaloguj się
        </LoadingButton>
      </Stack>
    </Box>
  );
};
