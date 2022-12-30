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
import { useTheme } from "@mui/material/styles";
import { useIsDrawerOpen } from "./MiniDrawer/hooks/useIsDrawerOpen";
import { AppBar } from "./MiniDrawer/AppBar";
import { Drawer } from "./MiniDrawer/Drawer";
import { DrawerHeader } from "./MiniDrawer/DrawerHeader";
import { DrawerItem } from "./MiniDrawer/DrawerItem";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MenuIcon from "@mui/icons-material/Menu";

type MiniDrawerProps = PropsWithChildren & { title: string };

export const MiniDrawer: FC<MiniDrawerProps> = (props) => {
  const [open, setOpen] = useIsDrawerOpen();
  const theme = useTheme();

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
            isDrawerOpen={open}
            text="Dokumenty w obiegu"
            icon={<MenuIcon />}
          />
          <DrawerItem
            isDrawerOpen={open}
            text="Manager dokumentów"
            icon={<MenuIcon />}
          />
          <DrawerItem
            isDrawerOpen={open}
            text="Generowanie dokumentów"
            icon={<MenuIcon />}
          />
          <DrawerItem
            isDrawerOpen={open}
            text="Skanowanie OCR"
            icon={<MenuIcon />}
          />
          <DrawerItem
            isDrawerOpen={open}
            text="Struktura organizacyjna"
            icon={<MenuIcon />}
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
