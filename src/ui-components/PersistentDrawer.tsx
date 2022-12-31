import { FC, PropsWithChildren, ReactNode } from "react";
import { Box, Toolbar, IconButton, Divider, Drawer } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { DrawerHeader } from "../layouts/MainNavigation/DrawerHeader";
import { useIsDrawerOpen } from "../layouts/MainNavigation/hooks/useIsDrawerOpen";
import { AppBar } from "../layouts/MainNavigation/AppBar";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

type PersistentDrawerProps = PropsWithChildren & {
  list: ReactNode;
};

export const PersistentDrawer: FC<PersistentDrawerProps> = (props) => {
  const [open, setOpen] = useIsDrawerOpen();
  const theme = useTheme();

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
            {open ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
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
        {props.list}
      </Drawer>
      <Box flexGrow={1} padding={3}>
        <DrawerHeader />
        <Box padding={4}>{props.children}</Box>
      </Box>
    </Box>
  );
};
