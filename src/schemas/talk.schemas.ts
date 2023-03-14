import { z } from "zod";
import user from "./user.schema";
import message from "./message.schema";

const create = z.object({
    members: z.array(z.string().uuid()).nonempty()
});

const returnTalk = z.object({
    id: z.string().uuid(),
    createdAt: z.date(),
    deleteAt: z.date().nullish(),
    members: user.removePwd.pick({ name: true, status: true, id: true }).array(),
    messages: z.object({
        text: z.string(),
        id: z.string().uuid(),
        createdAt: z.date()
    }).array()
});

const returnTalkWithoutMessages = returnTalk.omit({ messages: true });

const returnUserTalks = user.removePwd.extend({
    talks: returnTalk.omit({ members: true }).array()
});

export default {
    create,
    returnTalk,
    returnUserTalks,
    returnTalkWithoutMessages
}