import { hashSync } from "bcryptjs";

const correctPwd: string = ":aprenderei:"
const correctEmail: string = "ezio@mail.com"

export default {
    secretKey: "va$%mo&xplic@r",
    base: {
        name: "Ezio Auditore da Fireze",
        email: correctEmail,
        birthDate: "11/5/1991",
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