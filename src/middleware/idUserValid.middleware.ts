import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { User } from "../entities";
import { AppDataSource } from "../data-source";
import { AppError } from "../errors";
import { ID_NOT_VALID, USER_NOT_FOUND } from "../constraints/messages";

export async function idUserValid(req: Request, res: Response, next: NextFunction): Promise<void> {
    const id: string = req.params.id;
    const validate = require("uuid-validate");
    
    if (!id || !validate(id, validate.version(id))) throw new AppError(ID_NOT_VALID, 400);

    const userRepository: Repository<User> = AppDataSource.getRepository(User);

    const user: User | null = await userRepository.findOneBy({ id });

    if (!user) throw new AppError(USER_NOT_FOUND, 404);

    req.idUser;

    return next();
}