import { Repository } from "typeorm";
import { Talk, User } from "../../entities";
import { AppDataSource } from "../../data-source";
import schemas from "../../schemas";
import { iUserTalksReturn } from "../../interfaces";

async function list(id: string): Promise<iUserTalksReturn> {
    const userRepository: Repository<User> = AppDataSource.getRepository(User);

    const userTalks: User | null = await userRepository.findOne({ 
        where: { id },
        relations: {
            talks: true
        }
     });

    return schemas.talk.returnUserTalks.parse(userTalks);
}

export default list;

