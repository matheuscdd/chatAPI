import { z } from "zod";
import user from "./user.schema";
import talk from "./talk.schemas";

const create = z.object({
    text: z.string()
});

const returnMessageCreate = create.extend({
    id: z.string().uuid(),
    from: user.removePwd.pick({ id: true, name: true }),
    talk: talk.returnTalk.pick({ id: true })
});

export default {
    create,
    returnMessageCreate
}