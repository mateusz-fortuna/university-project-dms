import { context } from "msw";
import { DocumentHistory } from "./documentHistoryQueryResponse";
import { documents } from "./documentQueryResponse/documents";
import { RegisteredUser } from "./logInMutationResponse";

export interface Document {
  id: string;
  internalId: string;
  authorId: RegisteredUser["id"];
  name: string;
  createdAt: string;
  modifiedAt: string;
  history: DocumentHistory[];
}

export const documentsQueryResponse = (documentId?: Document["id"]) => {
  if (!documentId) {
    return context.json(documents);
  }

  const document = documents.filter((document) => document.id === documentId);

  return context.json(document);
};
