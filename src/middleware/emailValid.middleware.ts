import { NextFunction, Request, Response } from "express";
import { Repository } from "typeorm";
import { User } from "../entities";
import { AppDataSource } from "../data-source";
import { AppError } from "../errors";
import { EMAIL_ALREADY_EXISTS } from "../constraints/messages";

export async function emailValid(req: Request, res: Response, next: NextFunction): Promise<void> {
    const email: string = req.body.email;
    if(!email) return next();

    const userRepository: Repository<User> = AppDataSource.getRepository(User);

    const findUser: User | null = await userRepository.findOneBy({ email });
    if (findUser) throw new AppError(EMAIL_ALREADY_EXISTS);

    return next();
}