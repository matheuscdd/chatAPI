import { AppDataSource } from "../../data-source";
import { Repository } from "typeorm";
import { User } from "../../entities";
import { iUserCreate } from "../../interfaces";
import schemas from "../../schemas";


async function create(payload: iUserCreate) {
    const userRepository: Repository<User> = AppDataSource.getRepository(User);

    const user: User = userRepository.create(payload);

    await userRepository.save(user);

    return schemas.user.removePwd.parse(user);
}

export default create;