import { Router } from "express";
import middleware from "../middleware";
import schemas from "../schemas";
import controllers from "../controllers";

export const user: Router = Router();

user.post("", 
    middleware.dataValid(schemas.user.create), 
    middleware.emailValid,
    controllers.user.create
);

user.put("", 
    middleware.dataValid(schemas.user.status),
    controllers.user.status
);

user.get("",
    controllers.user.list
);

user.delete("",
    middleware.tokenValid,
    controllers.user.remove
);

user.patch("",
    middleware.tokenValid,
    middleware.dataValid(schemas.user.update),
    middleware.emailValid,
    controllers.user.update
);

user.get("/id/:id",
    middleware.idUserValid,
    controllers.user.findId
);

user.get("/name/:name",
    controllers.user.findName
);