import { FC, PropsWithChildren } from "react";
import {
  Box,
  CssBaseline,
  Toolbar,
  IconButton,
  Typography,
  Divider,
  List,
} from "@mui/material";
import { routes } from "../App";
import { useTheme } from "@mui/material/styles";
import { useLocation, useNavigate } from "react-router-dom";
import { useIsDrawerOpen } from "./MiniDrawer/hooks/useIsDrawerOpen";
import { AppBar } from "./MiniDrawer/AppBar";
import { Drawer } from "./MiniDrawer/Drawer";
import { DrawerHeader } from "./MiniDrawer/DrawerHeader";
import { DrawerItem } from "./MiniDrawer/DrawerItem";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MenuIcon from "@mui/icons-material/Menu";
import DocumentsIcon from "@mui/icons-material/ContentCopy";
import DocumentsManagerIcon from "@mui/icons-material/Source";
import ScanIcon from "@mui/icons-material/Scanner";
import InitiateIcon from "@mui/icons-material/UploadFile";
import OrganizationIcon from "@mui/icons-material/Group";
import AdminPanelIcon from "@mui/icons-material/AdminPanelSettings";

type MiniDrawerProps = PropsWithChildren & { title: string };

export const MiniDrawer: FC<MiniDrawerProps> = (props) => {
  const [open, setOpen] = useIsDrawerOpen();
  const route = useLocation().pathname.slice(1);
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={() => setOpen(true)}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {props.title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={() => setOpen(false)}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <DrawerItem
            text="Dokumenty w obiegu"
            icon={<DocumentsIcon color="primary" />}
            isSelected={route === routes.documents}
            onClick={() => navigate("/" + routes.documents)}
          />
          <DrawerItem
            text="Manager dokumentów"
            icon={<DocumentsManagerIcon color="primary" />}
            isSelected={route === routes.documentsManager}
            onClick={() => navigate("/" + routes.documentsManager)}
          />
          <DrawerItem
            text="Inicjowanie obiegu"
            icon={<InitiateIcon color="primary" />}
            isSelected={route === routes.initiate}
            onClick={() => navigate("/" + routes.initiate)}
          />
          <DrawerItem
            text="Skanowanie OCR"
            icon={<ScanIcon color="primary" />}
            isSelected={route === routes.scan}
            onClick={() => navigate("/" + routes.scan)}
          />
          <DrawerItem
            text="Struktura organizacyjna"
            icon={<OrganizationIcon color="primary" />}
            isSelected={route === routes.organization}
            onClick={() => navigate("/" + routes.organization)}
          />
          <Divider />
          <DrawerItem
            text="Panel administratora"
            icon={<AdminPanelIcon color="primary" />}
            isSelected={route === routes.adminPanel}
            onClick={() => navigate("/" + routes.adminPanel)}
          />
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {props.children}
      </Box>
    </Box>
  );
};
