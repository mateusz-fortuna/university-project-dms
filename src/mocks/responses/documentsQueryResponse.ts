import { context } from "msw";
import { DocumentRun } from "./documentRunQueryResponse";
import { DocumentRunStage } from "./documentRunStageQueryResponse";
import { RegisteredUser } from "./logInMutationResponse";

export interface DocumentHistory {
  id: string;
  stageId: DocumentRunStage["id"];
  createdAt: Date;
  assigneeId: RegisteredUser["id"];
}

export interface Document {
  id: string;
  internalId: string;
  runId: DocumentRun["id"];
  authorId: RegisteredUser["id"];
  name: string;
  createdAt: Date;
  modifiedAt: Date;
  history: DocumentHistory[];
}

export interface DocumentCategories {
  uncategorized: Array<DocumentRun["id"]>;
  projects: Array<DocumentRun["id"]>;
  internalDocuments: Array<DocumentRun["id"]>;
  contracts: Array<DocumentRun["id"]>;
}

export const documentsQueryResponse = () => {
  return context.json([]);
};
