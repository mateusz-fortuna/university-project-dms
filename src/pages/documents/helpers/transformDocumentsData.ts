import { nanoid } from "nanoid";
import { DocumentRun } from "../../../mocks/responses/documentRunsQueryResponse";
import { DocumentRunStage } from "../../../mocks/responses/documentRunStagesQueryResponse";
import { Document } from "../../../mocks/responses/documentsQueryResponse";
import { RegisteredUser } from "../../../mocks/responses/registeredUsersQueryResponse";

export const transformDocumentsData = (
  documents: Document[],
  runStages: DocumentRunStage[],
  users: RegisteredUser[],
  runs: DocumentRun[]
) => {
  return documents.map(({ internalId, history, authorId }: Document) => {
    const { stageId } = history[0];
    const stage = runStages.find((stage) => stage.id === stageId);

    if (!stage) {
      return {
        id: nanoid(),
        internalId,
        runName: "-",
        stageName: "-",
        lastRunAt: "-",
        stageStatus: "-",
        assignee: users.find((user) => user.id === authorId)?.name ?? "-",
      };
    }

    const run = runs.find((run) => run.id === stage.runId);
    const assignee = users.find((user) => user.id === authorId);

    return {
      id: nanoid(),
      internalId,
      runName: run?.name ?? "-",
      stageName: stage.name,
      lastRunAt: history[history.length - 1].createdAt,
      stageStatus:
        run?.stages?.find((runStage) => runStage.id === stage.id)?.status ??
        "-",
      assignee: assignee ? `${assignee.name} ${assignee.surname}` : "-",
    };
  });
};
