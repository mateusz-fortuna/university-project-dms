import { FC, useState, PropsWithChildren, ReactNode } from "react";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  List,
} from "@mui/material";

interface CollapsableListButtonProps extends PropsWithChildren {
  title: string;
  icon: ReactNode;
}

export const CollapsableListButton: FC<CollapsableListButtonProps> = ({
  children,
  title,
  icon,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      <ListItemButton onClick={() => setIsCollapsed((state) => !state)}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={title} />
        {isCollapsed ? <ExpandMore /> : <ExpandLess />}
      </ListItemButton>
      <Collapse in={!isCollapsed} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {children}
        </List>
      </Collapse>
    </>
  );
};
