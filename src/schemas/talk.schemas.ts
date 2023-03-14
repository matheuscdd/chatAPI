import { z } from "zod";
import user from "./user.schema";

const create = z.object({
    members: z.array(z.string().uuid()).nonempty()
});

const returnTalk = z.object({
    id: z.string().uuid(),
    createdAt: z.date(),
    updatedAt: z.date().nullish(),
    deleteAt: z.date().nullish(),
    members: user.removePwd.pick({ name: true, status: true, id: true }).array()
});

const returnUserTalks = user.removePwd.extend({
    talks: returnTalk.omit({ members: true }).array()
});

export default {
    create,
    returnTalk,
    returnUserTalks
}