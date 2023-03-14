import schemas from "../schemas";
import { z } from "zod";

export type iTalkCreateReturn = z.infer<typeof schemas.talk.returnTalk>;
export type iUserTalksReturn = z.infer<typeof schemas.talk.returnUserTalks>;