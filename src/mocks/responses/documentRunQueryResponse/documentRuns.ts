import { DocumentRun } from "../documentRunQueryResponse";
import { stages } from "../documentRunStageQueryResponse/documentRunStages";

const getStageByRunId = (runId: DocumentRun["id"]) => {
  return stages.filter((stage) => stage.runId === runId);
};

const names = [
  "Help Desk",
  "Faktura kosztowa",
  "Projekt",
  "Wniosek urlopowy",
  "Kontrola jakości",
  "Umowa o pracę",
];

export const runs = names.map<DocumentRun>((name, index) => ({
  id: String(index),
  name,
  stages: getStageByRunId(String(index)),
}));
