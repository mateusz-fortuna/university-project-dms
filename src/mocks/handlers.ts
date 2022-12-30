import { context, rest } from "msw";
import { Credentials } from "../pages/logIn/useLogInMutation";
import { logInMutationResponse } from "./responses/logInMutationResponse";

const delay = context.delay();

export const handlers = [
  rest.post("/login", async (req, res) => {
    const credentials = await req.json<Credentials>();
    console.log(credentials);

    return await res(delay, logInMutationResponse(credentials));
  }),
];
