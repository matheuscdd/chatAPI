import { Request, Response } from "express";
import services from "../services/user";
import { iUserWithoutPwd } from "../interfaces";

async function create(req: Request, res: Response): Promise<Response> {
    const user: iUserWithoutPwd = await services.create(req.body);
    return res.status(201).json(user);
}

async function list(req: Request, res: Response): Promise<Response> {
    const users: iUserWithoutPwd[] = await services.list();
    return res.status(200).json(users);
}

async function remove(req: Request, res: Response): Promise<Response> {
    await services.remove(req.params.id);
    return res.status(204).json();
}

async function update(req: Request, res: Response): Promise<Response> {
    const user: iUserWithoutPwd = await services.update.entire(req.body, req.idUser!);
    return res.status(200).json(user);
}

async function status(req: Request, res: Response): Promise<Response> {
    const user: iUserWithoutPwd = await services.update.status(req.body.status, req.idUser!);
    return res.status(200).json(user);
}

async function findId(req: Request, res: Response): Promise<Response> {
    const user: iUserWithoutPwd = await services.find.idUser(req.params.id);
    return res.status(200).json(user);
}

async function findName(req: Request, res: Response): Promise<Response> {
    const user: iUserWithoutPwd[] = await services.find.nameUser(req.params.name);
    return res.status(200).json(user);
}

async function profile(req: Request, res: Response): Promise<Response> {
    const user: iUserWithoutPwd = await services.profile(req.idUser!);
    return res.status(200).json(user);
}


export default {
    create,
    list,
    remove,
    status,
    update,
    profile,
    findId,
    findName
}