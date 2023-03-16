import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";
import { Repository } from "typeorm";
import { AppDataSource } from "../data-source";
import { User } from "../entities";
import { verify } from "jsonwebtoken";
import { MISSING_TOKEN, WRONG_TOKEN } from "../constraints/messages";

export async function tokenValid(req: Request, res: Response, next: NextFunction) {
    let token: string = req.headers.authorization!;
    if (!token) throw new AppError(MISSING_TOKEN, 401);

    token = token.split(" ")[1];

    async function check(error: any, decoded: any) {
        if (error) throw new AppError(error.message, 401);
        const userRepository: Repository<User> = AppDataSource.getRepository(User);
        const user: User | null = await userRepository.findOneBy({ email: decoded.email });
        if (!user) throw new AppError(WRONG_TOKEN, 401)
        req.idUser = decoded.sub;
    }

    await verify(token, String(process.env.SECRET_KEY), check);

    return next();
}