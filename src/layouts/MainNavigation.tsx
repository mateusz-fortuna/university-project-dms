import { FC, PropsWithChildren } from "react";
import {
  Box,
  Toolbar,
  IconButton,
  Typography,
  Divider,
  List,
} from "@mui/material";
import { config } from "../App/config";
import { useTheme } from "@mui/material/styles";
import { useLocation, useNavigate } from "react-router-dom";
import { useIsDrawerOpen } from "./MainNavigation/hooks/useIsDrawerOpen";
import { useLocalStorage } from "react-use";
import { AppBar } from "./MainNavigation/AppBar";
import { Drawer } from "./MainNavigation/Drawer";
import { DrawerHeader } from "./MainNavigation/DrawerHeader";
import { DrawerItem } from "./MainNavigation/DrawerItem";
import { LogInMutationResponse } from "../pages/logIn/useLogInMutation";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MenuIcon from "@mui/icons-material/Menu";
import DocumentsIcon from "@mui/icons-material/ContentCopy";
import DocumentsManagerIcon from "@mui/icons-material/Source";
import ScanIcon from "@mui/icons-material/Scanner";
import InitiateIcon from "@mui/icons-material/UploadFile";
import OrganizationIcon from "@mui/icons-material/Group";
import AdminPanelIcon from "@mui/icons-material/AdminPanelSettings";

type MainNavigationProps = PropsWithChildren & { title: string };

export const MainNavigation: FC<MainNavigationProps> = (props) => {
  const [userData] = useLocalStorage<LogInMutationResponse>("userData");
  const [open, setOpen] = useIsDrawerOpen();
  const { pathname } = useLocation();
  const { routes } = config;
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box display="flex">
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
            isSelected={pathname === routes.documents}
            onClick={() => navigate(routes.documents)}
          />
          <DrawerItem
            text="Manager dokumentów"
            icon={<DocumentsManagerIcon color="primary" />}
            isSelected={pathname === routes.documentsManager}
            onClick={() => navigate(routes.documentsManager)}
          />
          <DrawerItem
            text="Inicjowanie obiegu"
            icon={<InitiateIcon color="primary" />}
            isSelected={pathname === routes.initiate}
            onClick={() => navigate(routes.initiate)}
          />
          <DrawerItem
            text="Skanowanie OCR"
            icon={<ScanIcon color="primary" />}
            isSelected={pathname === routes.scan}
            onClick={() => navigate(routes.scan)}
          />
          <DrawerItem
            text="Struktura organizacyjna"
            icon={<OrganizationIcon color="primary" />}
            isSelected={pathname === routes.organization}
            onClick={() => navigate(routes.organization)}
          />
          <Divider />
          {userData?.role === "ADMIN" && (
            <DrawerItem
              text="Panel administratora"
              icon={<AdminPanelIcon color="primary" />}
              isSelected={pathname === routes.adminPanel}
              onClick={() => navigate(routes.adminPanel)}
            />
          )}
        </List>
      </Drawer>
      <Box flexGrow={1} padding={3}>
        <DrawerHeader />
        {props.children}
      </Box>
    </Box>
  );
};
