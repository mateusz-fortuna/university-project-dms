import { FC } from "react";
import { Typography } from "@mui/material";
import { MainNavigation } from "../layouts/MainNavigation";

export const Organization: FC = () => {
  return (
    <MainNavigation title="Struktura organizacyjna">
      <Typography>Widoczna struktura organizacyjna firmy</Typography>
    </MainNavigation>
  );
};
