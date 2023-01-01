import { FC } from "react";
import { Box } from "@mui/material";
import { MainNavigation } from "../layouts/MainNavigation";
import {
  Timeline,
  TimelineConnector,
  TimelineContent,
  TimelineItem,
  TimelineSeparator,
} from "@mui/lab";
import Avatar from "@mui/material/Avatar";

export const Organization: FC = () => {
  return (
    <MainNavigation title="Struktura organizacyjna">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="calc(100vh - 64px)"
      >
        <Timeline>
          <TimelineItem>
            <TimelineSeparator>
              <Avatar src="/assets/images/kowalski.jpg" alt="Boss" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              Jan Kowalski <i>(prezes)</i>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <Avatar src="/assets/images/nowak.jpg" alt="Worker" />
            </TimelineSeparator>
            <TimelineContent>
              Marek Nowak <i>(pracownik)</i>
            </TimelineContent>
          </TimelineItem>
        </Timeline>
      </Box>
    </MainNavigation>
  );
};
