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
import { useIsImageLoading } from "./scan/hooks/useIsImageLoading";
import { Loader } from "../ui-components/Loader";
import Avatar from "@mui/material/Avatar";

export const Organization: FC = () => {
  const bossImageSrc = "/assets/images/kowalski.jpg";
  const workerImageSrc = "/assets/images/nowak.jpg";

  const isBossAvatarLoading = useIsImageLoading(bossImageSrc);
  const isWorkerAvatarLoading = useIsImageLoading(workerImageSrc);

  if (isBossAvatarLoading || isWorkerAvatarLoading) {
    return (
      <MainNavigation title="Struktura organizacyjna">
        <Loader>Ładowanie danych...</Loader>
      </MainNavigation>
    );
  }

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
              <Avatar src={bossImageSrc} alt="Boss" />
              <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
              Jan Kowalski <i>(prezes)</i>
            </TimelineContent>
          </TimelineItem>
          <TimelineItem>
            <TimelineSeparator>
              <Avatar src={workerImageSrc} alt="Worker" />
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
