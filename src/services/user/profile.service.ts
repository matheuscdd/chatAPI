import { Repository } from "typeorm";
import { User } from "../../entities";
import { AppDataSource } from "../../data-source";
import schemas from "../../schemas";

async function profile(id: string) {
    const userRepository: Repository<User> = AppDataSource.getRepository(User);

    const user: User | null = await userRepository.findOneBy({ id });

    return schemas.user.removePwd.parse(user);
}

export default profile;