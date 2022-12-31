import { context } from "msw";
import { runs } from "./documentRunQueryResponse/documentRuns";
import { DocumentRunStage } from "./documentRunStageQueryResponse";

export interface DocumentRun {
  id: string;
  name: string;
  stages: DocumentRunStage[] | null;
}

export const documentRunQueryResponse = (id?: DocumentRun["id"]) => {
  if (!id) {
    return context.json(runs);
  }

  const run = runs.find((run) => run.id === id);

  return run ? context.json(run) : context.status(404);
};
