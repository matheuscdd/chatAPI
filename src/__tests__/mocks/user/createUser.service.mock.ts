import { iUserCreate } from "../../../interfaces"

interface iUserCreateMock {
    valid: iUserCreate;
    unique: iUserCreate;
}

export default {
    valid: {
        name: "Thanatos Albertino",
        email: "thanatos@mail.com",
        password: "IxwL#7zp1T3^",
        birthDate: "11/5/1991",
        status: "active"
    },
    unique: {
        name: "Uzumaki Naruto",
        email: "naruto@konoha.com.br",
        password: "HinataTeAmo",
        birthDate: "10/10/1995",
        status: "active"
    }
} as iUserCreateMock;