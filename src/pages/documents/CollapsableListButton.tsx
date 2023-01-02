import { FC, useState, PropsWithChildren } from "react";
import { ExpandLess, ExpandMore } from "@mui/icons-material";
import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  List,
} from "@mui/material";
import FolderIcon from "@mui/icons-material/Folder";

interface CollapsableListButtonProps extends PropsWithChildren {
  title: string;
}

export const CollapsableListButton: FC<CollapsableListButtonProps> = ({
  children,
  title,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <>
      <ListItemButton onClick={() => setIsCollapsed((state) => !state)}>
        <ListItemIcon>
          <FolderIcon />
        </ListItemIcon>
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
