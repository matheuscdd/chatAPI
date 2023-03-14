import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { Talk } from "../entities";
import { AppDataSource } from "../data-source";
import { AppError } from "../errors";

export async function idTalkValid(req: Request, res: Response, next: NextFunction): Promise<void> {
    const id: string = req.params.id;
    const validate = require("uuid-validate");

    if (!id || !validate(id, validate.version(id))) throw new AppError(`Id is not valid`, 400);
       
    const talkRepository: Repository<Talk> = AppDataSource.getRepository(Talk);

    const talk: Talk | null = await talkRepository.findOneBy({ id });

    if (!talk) throw new AppError(`Talk not found`, 404);

    req.idTalk = id;

    return next();
}