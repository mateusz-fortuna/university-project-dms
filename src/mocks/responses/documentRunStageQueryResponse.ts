import { context } from "msw";
import { DocumentRun } from "./documentRunQueryResponse";
import { stages } from "./documentRunStageQueryResponse/documentRunStages";

export interface DocumentRunStage {
  id: string;
  runId: DocumentRun["id"];
  name: string;
  status: "IN_PROGRESS" | "DONE";
}

export const documentRunStageQueryResponse = (
  runId?: DocumentRunStage["runId"]
) => {
  if (!runId) {
    return context.json(stages);
  }

  const runStages = stages.find((stage) => stage.runId === runId);

  return runStages ? context.json(runStages) : context.status(404);
};
