import { Router } from "express";
import controllers from "../controllers";
import middleware from "../middleware";
import schemas from "../schemas";

export const talk: Router = Router();

talk.post("", 
    middleware.dataValid(schemas.talk.create),
    middleware.tokenValid,
    controllers.talk.create
);

talk.get("/:id", 
    middleware.idTalkValid,
    middleware.tokenValid,
    middleware.userInTalkValid,
    controllers.talk.find
);

talk.get("",
    middleware.tokenValid,
    controllers.talk.list
);

talk.delete("/:id",
    middleware.tokenValid,
    middleware.idTalkValid,
    middleware.userInTalkValid,
    controllers.talk.remove
);

talk.get("/lastUpdate/:id", 
    middleware.tokenValid,
    middleware.idTalkValid,
    middleware.userInTalkValid,
    controllers.talk.lastUpdate
);