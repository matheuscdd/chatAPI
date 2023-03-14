import { AppDataSource } from "../../data-source";
import { Repository } from "typeorm";
import { User } from "../../entities";

async function remove(id: string): Promise<void> {
    const userRepository: Repository<User> = AppDataSource.getRepository(User);

    await userRepository.softRemove({ id });
}

export default remove;