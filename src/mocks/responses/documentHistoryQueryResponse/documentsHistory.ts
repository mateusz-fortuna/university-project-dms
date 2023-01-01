import { format, subDays } from "date-fns";
import { getRandomIntBetween } from "../../../helpers/getRandomIntBetween";
import { DocumentHistory } from "../documentHistoryQueryResponse";

const today = new Date();

export const documentsHistory: DocumentHistory[] = [
  {
    id: "1",
    assigneeId: "1",
    createdAt: format(
      subDays(today, getRandomIntBetween(1, 365)),
      "yyyy-MM-dd"
    ),
    documentId: "1",
    stageId: "1",
  },
  {
    id: "2",
    assigneeId: "2",
    createdAt: format(
      subDays(today, getRandomIntBetween(1, 365)),
      "yyyy-MM-dd"
    ),
    documentId: "4",
    stageId: "6",
  },
];
