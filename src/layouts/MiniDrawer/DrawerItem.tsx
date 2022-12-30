import { FC, ReactNode } from "react";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useLocalStorage } from "react-use";

interface DrawerItemProps {
  text: string;
  icon: ReactNode;
  isSelected: boolean;
  onClick: () => void;
}

export const DrawerItem: FC<DrawerItemProps> = ({
  text,
  icon,
  isSelected,
  onClick,
}) => {
  const [isDrawerOpen] = useLocalStorage("isDrawerOpen");

  return (
    <ListItem disablePadding sx={{ display: "block" }}>
      <ListItemButton
        onClick={onClick}
        selected={isSelected}
        sx={{
          minHeight: 48,
          justifyContent: isDrawerOpen ? "initial" : "center",
          px: 2.5,
        }}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: isDrawerOpen ? 3 : "auto",
            justifyContent: "center",
          }}
        >
          {icon}
        </ListItemIcon>
        <ListItemText primary={text} sx={{ opacity: isDrawerOpen ? 1 : 0 }} />
      </ListItemButton>
    </ListItem>
  );
};
