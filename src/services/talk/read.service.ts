import { Repository } from "typeorm";
import { Talk, User } from "../../entities";
import { AppDataSource } from "../../data-source";
import schemas from "../../schemas";
import { iTalkCreateReturn, iUserTalksReturn } from "../../interfaces";

async function find(id: string): Promise<iTalkCreateReturn> {
    const talkRepository: Repository<Talk> = AppDataSource.getRepository(Talk);

    const talk: Talk | null = await talkRepository.findOne({
        where: { id },
        relations: {
            members: true
        }
    });

    return schemas.talk.returnTalk.parse(talk);
}

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

export default {
    find,
    list
}
