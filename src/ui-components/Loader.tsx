import { CircularProgress, CssVarsProvider } from "@mui/joy";
import { Box, Typography } from "@mui/material";
import { FC, PropsWithChildren } from "react";

export const Loader: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center" gap={2}>
      <CssVarsProvider>
        <CircularProgress />
      </CssVarsProvider>
      <Typography component="h2" variant="h5">
        {children}
      </Typography>
    </Box>
  );
};
