import { Like, Repository } from "typeorm";
import { iUserWithoutPwd } from "../../interfaces";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import schemas from "../../schemas";
import { AppError } from "../../errors";
import { USER_NOT_FOUND, WRITE_NAME } from "../../constraints/messages";

async function idUser(id: string): Promise<iUserWithoutPwd> {
    const userRepository: Repository<User> = AppDataSource.getRepository(User);

    const user: User | null = await userRepository.findOneBy({ id });

    return schemas.user.removePwd.parse(user);
}

async function nameUser(name: string): Promise<iUserWithoutPwd[]> {
    name = name.replace("_", " ");
    if(!name) throw new AppError(WRITE_NAME, 400);

    const userRepository: Repository<User> = AppDataSource.getRepository(User);

    const users: User[] = await userRepository.createQueryBuilder("user")
        .where("LOWER(user.name) LIKE :name", { name: `%${name.toLowerCase()}%` })
        .getMany();

    if (!users) throw new AppError(USER_NOT_FOUND, 404);

    return schemas.user.removePwd.array().parse(users);
    
}

export default {
    idUser,
    nameUser
}