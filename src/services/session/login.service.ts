import { Repository } from "typeorm";
import { iLogin, iToken } from "../../interfaces";
import { User } from "../../entities";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

export async function login(payload: iLogin): Promise<iToken> {
    const userRepository: Repository<User> = AppDataSource.getRepository(User);
    
    const userFound: User | null = await userRepository.findOneBy({ email: payload.email });

    if (!userFound) throw new AppError(`Email or password wrong`, 401);

    const pwdMatch: boolean = await compare(payload.password, userFound.password);

    if (!pwdMatch) throw new AppError(`Email or password wrong`, 401);

    const token: string = sign(
        { email: userFound.email },
        String(process.env.SECRET_KEY),
        { expiresIn: "24h", subject: String(userFound.id) }
    );

    return { token };
}