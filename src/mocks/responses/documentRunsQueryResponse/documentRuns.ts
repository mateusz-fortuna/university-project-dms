import { DocumentRun } from "../documentRunsQueryResponse";
import { stages } from "../documentRunStageQueryResponse/documentRunStages";

const getStageByRunId = (runId: DocumentRun["id"]) => {
  return stages.filter((stage) => stage.runId === runId);
};

export const runs: DocumentRun[] = [
  { id: "1", categoryId: "1", name: "Help Desk", stages: getStageByRunId("1") },
  {
    id: "2",
    categoryId: "1",
    name: "Faktura kosztowa",
    stages: getStageByRunId("2"),
  },
  { id: "3", categoryId: "2", name: "Projekt", stages: getStageByRunId("3") },
  {
    id: "4",
    categoryId: "3",
    name: "Wniosek urlopowy",
    stages: getStageByRunId("4"),
  },
  {
    id: "5",
    categoryId: "3",
    name: "Kontrola jakości",
    stages: getStageByRunId("5"),
  },
  {
    id: "6",
    categoryId: "4",
    name: "Umowa o pracę",
    stages: getStageByRunId("6"),
  },
];
