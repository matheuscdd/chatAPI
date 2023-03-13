import { z } from "zod";
import schemas from "../schemas";
import { DeepPartial } from "typeorm";
import { User } from "../entities";

export type iStatus = "active" | "busy" | "absent";
export type iUserCreate = z.infer<typeof schemas.user.create>;
export type iUserUpdate = DeepPartial<User>;
export type iUserWithoutPwd = z.infer<typeof schemas.user.removePwd>;


