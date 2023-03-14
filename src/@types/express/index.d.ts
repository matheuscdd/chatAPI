import * as express from "express";

declare global {
    namespace Express {
        interface Request {
            idUser?: string;
            idTalk?: string;
        }
    }
}