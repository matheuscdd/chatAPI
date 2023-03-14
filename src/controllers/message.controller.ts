import { Request, Response } from "express";
import services from "../services/message";

async function create(req: Request, res: Response): Promise<Response> {
    const message = await services.create(req.body.text, req.idUser!, req.idTalk!);
    return res.status(201).json(message);
}

export default {
    create
}