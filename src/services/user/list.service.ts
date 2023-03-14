import { AppDataSource } from "../../data-source";
import { Repository } from "typeorm";
import { User } from "../../entities";
import { iUserWithoutPwd } from "../../interfaces";
import schemas from "../../schemas";

async function list(): Promise<iUserWithoutPwd[]> {
    const userRepository: Repository<User> = AppDataSource.getRepository(User);

    const users: User[] = await userRepository.find();
    
    return schemas.user.removePwd.array().parse(users);
}

export default list;