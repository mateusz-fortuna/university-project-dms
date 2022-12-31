import { Document } from "../documentsQueryResponse";
import { format, subDays } from "date-fns";
import { getRandomIntBetween } from "../../../helpers/getRandomIntBetween";
import { documentsHistory } from "../documentHistoryQueryResponse/documentsHistory";

const getHistoryByDocumentId = (documentId: Document["id"]) => {
  return documentsHistory.filter(
    (history) => history.documentId === documentId
  );
};

const today = new Date();

export const documents: Document[] = [
  {
    id: "1",
    internalId: `HD/${format(
      subDays(today, getRandomIntBetween(1, 365)),
      "dd/MM/yyyy"
    )}`,
    authorId: "1",
    name: "Problem_z_drukarką.docx",
    createdAt: format(
      subDays(today, getRandomIntBetween(1, 365)),
      "yyyy-MM-dd"
    ),
    modifiedAt: format(
      subDays(today, getRandomIntBetween(1, 30)),
      "yyyy-MM-dd"
    ),
    history: getHistoryByDocumentId("1"),
  },
  {
    id: "2",
    internalId: `HD/${format(
      subDays(today, getRandomIntBetween(1, 365)),
      "dd/MM/yyyy"
    )}`,
    authorId: "1",
    name: "Komputer nie działa.docx",
    createdAt: format(
      subDays(today, getRandomIntBetween(1, 365)),
      "yyyy-MM-dd"
    ),
    modifiedAt: format(
      subDays(today, getRandomIntBetween(1, 30)),
      "yyyy-MM-dd"
    ),
    history: getHistoryByDocumentId("1"),
  },
  {
    id: "3",
    internalId: `FV/${format(
      subDays(today, getRandomIntBetween(1, 365)),
      "dd/MM/yyyy"
    )}`,
    authorId: "1",
    name: "Faktura za usługi informatyczne - Kowalski Piotr.docx",
    createdAt: format(
      subDays(today, getRandomIntBetween(1, 365)),
      "yyyy-MM-dd"
    ),
    modifiedAt: format(
      subDays(today, getRandomIntBetween(1, 30)),
      "yyyy-MM-dd"
    ),
    history: getHistoryByDocumentId("1"),
  },
  {
    id: "4",
    internalId: `FV/${format(
      subDays(today, getRandomIntBetween(1, 365)),
      "dd/MM/yyyy"
    )}`,
    authorId: "1",
    name: "Faktura za internet.docx",
    createdAt: format(
      subDays(today, getRandomIntBetween(1, 365)),
      "yyyy-MM-dd"
    ),
    modifiedAt: format(
      subDays(today, getRandomIntBetween(1, 30)),
      "yyyy-MM-dd"
    ),
    history: getHistoryByDocumentId("1"),
  },
];
