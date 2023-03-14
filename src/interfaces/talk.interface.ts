import schemas from "../schemas";
import { z } from "zod";

export type iTalkCreateReturn = z.infer<typeof schemas.talk.returnTalkWithoutMessages>;
export type iUserTalksReturn = z.infer<typeof schemas.talk.returnUserTalks>;