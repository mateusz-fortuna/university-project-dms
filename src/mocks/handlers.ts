import { rest } from "msw";
import { nanoid } from "nanoid";
import { LogInMutationResponse } from "../pages/logIn/useLogInMutation";

export const handlers = [
  rest.post("/login", async (_req, res, ctx) => {
    return await res(ctx.json<LogInMutationResponse>({ token: nanoid() }));
  }),
];
