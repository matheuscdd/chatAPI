import { dataValid } from "./dataValid.middleware";
import { emailValid } from "./emailValid.middleware";
import { idTalkValid } from "./idTalkValid.middleware";
import { idUserValid } from "./idUserValid.middleware";
import { tokenValid } from "./tokenValid.middleware";
import { upload } from "./upload.middleware";
import { userInTalkValid } from "./userInTalkValid.middleware";

export default {
    upload,
    dataValid,
    emailValid,
    idUserValid,
    tokenValid,
    idTalkValid,
    userInTalkValid
}