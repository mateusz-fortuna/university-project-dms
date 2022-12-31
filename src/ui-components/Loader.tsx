import { CircularProgress, CssVarsProvider } from "@mui/joy";
import { Box, Typography } from "@mui/material";
import { FC, PropsWithChildren } from "react";

export const Loader: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Box
      position="fixed"
      top={0}
      left="50%"
      sx={{ transform: "translate3d(-50%,0,0)" }}
      display="flex"
      justifyContent="center"
      alignItems="center"
      gap={2}
      height="100vh"
    >
      <CssVarsProvider>
        <CircularProgress />
      </CssVarsProvider>
      <Typography component="h2" variant="h5">
        {children}
      </Typography>
    </Box>
  );
};
