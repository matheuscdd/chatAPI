import { dataValid } from "./dataValid.middleware";
import { emailValid } from "./emailValid.middleware";
import { idTalkValid } from "./idTalkValid.middleware";
import { idUserValid } from "./idUserValid.middleware";
import { tokenValid } from "./tokenValid.middleware";
import { userInTalkValid } from "./userInTalkValid.middleware";

export default {
    dataValid,
    emailValid,
    idUserValid,
    tokenValid,
    idTalkValid,
    userInTalkValid
}