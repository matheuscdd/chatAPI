import { Request, Response } from "express";
import services from "../services/talk";
import { iTalkCreateReturn, iUserTalksReturn } from "../interfaces";

async function create(req: Request, res: Response): Promise<Response> {
    req.body.members.push(req.idUser);
    const talk: iTalkCreateReturn = await services.create(req.body.members);
    return res.status(201).json(talk);
}

async function find(req: Request, res: Response): Promise<Response> {
    const talk = await services.find(req.idTalk!);
    return res.status(200).json(talk);
}

async function list(req: Request, res: Response): Promise<Response> {
    const userTalks: iUserTalksReturn = await services.list(req.idUser!);
    return res.status(200).json(userTalks);
}

async function remove(req: Request, res: Response): Promise<Response> {
    await services.remove(req.idTalk!);
    return res.status(204).json();
}

export default {
    create,
    find,
    list,
    remove
}