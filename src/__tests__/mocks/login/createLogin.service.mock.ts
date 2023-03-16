import { hashSync } from "bcryptjs";

const correctPwd: string = ":aprenderei:"
const correctEmail: string = "ezio@mail.com"

export default {
    secretKey: "va$%mo&xplic@r",
    base: {
        name: "Ezio",
        email: correctEmail,
        birthDate: "16/09/1998",
        password: hashSync(correctPwd, 10)
    },
    valid: {
        email: correctEmail,
        password: correctPwd
    },
    invalidEmail: {
        email: "invalidEmail@mail.com",
        password: correctPwd
    },
    invalidPassword: {
        email: correctEmail,
        password: "invalidPassword"
    }
}