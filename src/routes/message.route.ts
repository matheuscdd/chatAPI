import { Router } from "express";
import middleware from "../middleware";
import schemas from "../schemas";
import controllers from "../controllers";

export const message: Router = Router();

message.post("/:id", 
    middleware.dataValid(schemas.message.create),
    middleware.tokenValid,
    middleware.idTalkValid,
    middleware.userInTalkValid,
    controllers.message.create
);