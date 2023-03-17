import { MISSING_TOKEN } from "../../constraints/messages";

export default {
    missingToken: { error: { message: MISSING_TOKEN }, status: 401 },
    jwtMalformed: { error: { message: `jwt malformed` }, status: 401 },
    invalidSignature: { error: { message: `invalid signature` }, status: 401 },
}