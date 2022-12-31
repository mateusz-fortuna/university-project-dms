import { context } from "msw";
import { DocumentRunCategory } from "./documentRunCategoriesQueryResponse";
import { runs } from "./documentRunsQueryResponse/documentRuns";
import { DocumentRunStage } from "./documentRunStagesQueryResponse";

export interface DocumentRun {
  id: string;
  categoryId: DocumentRunCategory["id"];
  name: string;
  stages: DocumentRunStage[];
}

export const documentRunsQueryResponse = (id?: DocumentRun["id"]) => {
  if (!id) {
    return context.json(runs);
  }

  const run = runs.filter((run) => run.id === id);

  return context.json(run);
};
