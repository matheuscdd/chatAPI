import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { User } from "../entities";
import { AppDataSource } from "../data-source";
import { AppError } from "../errors";

export async function idUserValid(req: Request, res: Response, next: NextFunction): Promise<void> {
    const id: string = req.params.id;
    const validate = require("uuid-validate");
    
    if (!id || !validate(id, validate.version(id))) throw new AppError(`Id is not valid`, 400);

    const userRepository: Repository<User> = AppDataSource.getRepository(User);

    const user: User | null = await userRepository.findOneBy({ id });

    if (!user) throw new AppError(`User not found`, 404);

    req.idUser;

    return next();
}