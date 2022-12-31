import { context, rest } from "msw";
import { Credentials } from "../pages/logIn/useLogInMutation";
import { documentsQueryResponse } from "./responses/documentsQueryResponse";
import { logInMutationResponse } from "./responses/logInMutationResponse";

const delay = context.delay();

export const handlers = [
  rest.post("/login", async (req, res) => {
    const credentials = await req.json<Credentials>();
    return await res(delay, logInMutationResponse(credentials));
  }),
  rest.get("/document", async (_req, res) => {
    return await res(delay, documentsQueryResponse());
  }),
];
