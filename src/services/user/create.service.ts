import { Repository } from "typeorm";
import { iUserCreate } from "../../interfaces";
import { User } from "../../entities";
import { AppDataSource } from "../../data-source";
import schemas from "../../schemas";


async function create(payload: iUserCreate) {
    const userRepository: Repository<User> = AppDataSource.getRepository(User);

    const user: User = userRepository.create(payload);

    await userRepository.save(user);

    return schemas.user.removePwd.parse(user);
}

export default create;