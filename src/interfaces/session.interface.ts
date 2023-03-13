import { z } from "zod";
import schemas from "../schemas";

export type iLogin = z.infer<typeof schemas.session.login>
export interface iToken {
    token: string;
}