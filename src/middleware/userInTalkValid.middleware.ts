import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { Talk } from "../entities";
import { AppDataSource } from "../data-source";
import { AppError } from "../errors";

export async function userInTalkValid(req: Request, res: Response, next: NextFunction): Promise<void> {
    const talkRepository: Repository<Talk> = AppDataSource.getRepository(Talk);

    const talk: Talk | null = await talkRepository
        .createQueryBuilder("talk")
        .innerJoinAndSelect("talk.members", "users", "users.id = :idUser", { idUser: req.idUser })
        .where("talk.id = :idTalk", { idTalk: req.idTalk })
        .getOne()

    if (!talk) throw new AppError(`You're not member of this talk`, 409);

    return next();
}