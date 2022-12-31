import { FC } from "react";
import { Typography } from "@mui/material";
import { MainNavigation } from "../layouts/MainNavigation";

export const AdminPanel: FC = () => {
  return (
    <MainNavigation title="Panel administratora">
      <Typography>Możliwość zmiany nazwy plików</Typography>
      <Typography>Możliwość definiowania obiegów wraz z ich etapami</Typography>
      <Typography>Możliwość zarządzania użytkownikami</Typography>
    </MainNavigation>
  );
};
