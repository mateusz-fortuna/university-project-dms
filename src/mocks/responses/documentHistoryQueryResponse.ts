import { context } from "msw";
import { documentsHistory } from "./documentHistoryQueryResponse/documentsHistory";
import { DocumentRunStage } from "./documentRunStagesQueryResponse";
import { Document } from "./documentsQueryResponse";
import { RegisteredUser } from "./registeredUsersQueryResponse";

export interface DocumentHistory {
  id: string;
  documentId: Document["id"];
  stageId: DocumentRunStage["id"];
  createdAt: string;
  assigneeId: RegisteredUser["id"];
}

export const documentHistoryQueryResponse = (documentId?: Document["id"]) => {
  if (!documentId) {
    return context.json(documentsHistory);
  }

  const documentHistory = documentsHistory.filter(
    (history) => history.documentId === documentId
  );

  return context.json(documentHistory);
};
