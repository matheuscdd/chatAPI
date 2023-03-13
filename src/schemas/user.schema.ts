import { z } from "zod";

const create = z.object({
    name: z.string().min(8).max(100),
    email: z.string().min(4).max(120),
    description: z.string().nullish(),
    password: z.string().max(20),
    status: z.enum(["active", "busy", "absent"]).default("active"),
    birthDate: z.preprocess((value) => {
        if (typeof value === "string" && value.includes("/")) {
            const [day, month, year] = value.split("/");
            return new Date(Number(year), Number(month) - 1, Number(day));
        } else if (value instanceof Date) {
            return value;
        } else {
            return value
        }
    }, z.date().or(z.string()))
});

const update = create.partial();

const removePwd = create.omit({ password: true }).merge(
z.object({
    createdAt: z.date(),
    updatedAt: z.date().nullish(),
    deleteAt: z.date().nullish(),
    id: z.string(),
}));

export default {
    create,
    update,
    removePwd
}