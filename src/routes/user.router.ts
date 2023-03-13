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

user.get("",
    controllers.user.list
);

user.delete("/:id",
    middleware.idUserValid,
    controllers.user.remove
);

user.get("/id/:id",
    // middleware.idUserValid,
    controllers.user.findId
);

user.get("/name/:name",
    controllers.user.findName
);