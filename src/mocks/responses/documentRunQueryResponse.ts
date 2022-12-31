import { context } from "msw";
import { DocumentRunCategory } from "./documentRunCategoriesQueryResponse";
import { runs } from "./documentRunQueryResponse/documentRuns";
import { DocumentRunStage } from "./documentRunStageQueryResponse";

export interface DocumentRun {
  id: string;
  categoryId: DocumentRunCategory["id"];
  name: string;
  stages: DocumentRunStage[] | null;
}

export const documentRunQueryResponse = (id?: DocumentRun["id"]) => {
  if (!id) {
    return context.json(runs);
  }

  const run = runs.filter((run) => run.id === id);

  return context.json(run);
};
