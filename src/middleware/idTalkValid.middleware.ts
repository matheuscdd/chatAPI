import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { Talk } from "../entities";
import { AppDataSource } from "../data-source";
import { AppError } from "../errors";
import { ID_NOT_VALID, TALK_NOT_FOUND } from "../constraints/messages";

export async function idTalkValid(req: Request, res: Response, next: NextFunction): Promise<void> {
    const id: string = req.params.id;
    const validate = require("uuid-validate");

    if (!id || !validate(id, validate.version(id))) throw new AppError(ID_NOT_VALID, 400);
       
    const talkRepository: Repository<Talk> = AppDataSource.getRepository(Talk);

    const talk: Talk | null = await talkRepository.findOneBy({ id });

    if (!talk) throw new AppError(TALK_NOT_FOUND, 404);

    req.idTalk = id;

    return next();
}