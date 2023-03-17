import { AppDataSource } from "../../data-source";
import { Repository } from "typeorm";
import { User } from "../../entities";
import { iLogin, iToken } from "../../interfaces";
import { AppError } from "../../errors";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { EMAIL_OR_PWD_WRONG } from "../../constraints/messages";

async function login(payload: iLogin): Promise<iToken> {
    const userRepository: Repository<User> = AppDataSource.getRepository(User);
    
    const user: User | null = await userRepository.findOneBy({ email: payload.email });

    if (!user) throw new AppError(EMAIL_OR_PWD_WRONG, 401);

    const pwdMatch: boolean = await compare(payload.password, user.password);

    if (!pwdMatch) throw new AppError(EMAIL_OR_PWD_WRONG, 401);

    const token: string = sign(
        { email: user.email },
        String(process.env.SECRET_KEY),
        { expiresIn: "24h", subject: String(user.id) }
    );

    return { token };
}

export default login;