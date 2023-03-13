import { Router } from "express";
import middleware from "../middleware";
import schemas from "../schemas";
import controllers from "../controllers";

export const session: Router = Router();

session.post("", 
    middleware.dataValid(schemas.session.login), 
    controllers.session.login
);