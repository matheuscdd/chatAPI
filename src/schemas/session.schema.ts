import { z } from "zod";

const login = z.object({
    email: z.string().email().min(4).max(120),
    password: z.string().max(20)
});

export default {
    login
}