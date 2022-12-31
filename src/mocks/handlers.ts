import { context, rest } from "msw";
import { Credentials } from "../pages/logIn/useLogInMutation";
import { documentRunCategoriesQueryResponse } from "./responses/documentRunCategoriesQueryResponse";
import { documentRunsQueryResponse } from "./responses/documentRunsQueryResponse";
import { documentRunStagesQueryResponse } from "./responses/documentRunStagesQueryResponse";
import { documentsQueryResponse } from "./responses/documentsQueryResponse";
import { logInMutationResponse } from "./responses/logInMutationResponse";
import { registeredUsersQueryResponse } from "./responses/registeredUsersQueryResponse";

const delay = context.delay();

export const handlers = [
  rest.post("/login", async (req, res) => {
    const credentials = await req.json<Credentials>();
    return await res(delay, logInMutationResponse(credentials));
  }),
  rest.get("/document", async (_req, res) => {
    return await res(delay, documentsQueryResponse());
  }),
  rest.get("/document/run", async (_req, res) => {
    return await res(delay, documentRunsQueryResponse());
  }),
  rest.get("/document/run/stage", async (_req, res) => {
    return await res(delay, documentRunStagesQueryResponse());
  }),
  rest.get("/document/run/categories", async (_req, res) => {
    return await res(delay, documentRunCategoriesQueryResponse());
  }),
  rest.get("/users", async (_req, res) => {
    return await res(delay, registeredUsersQueryResponse());
  }),
];
