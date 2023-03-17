import { AppDataSource } from "../../data-source";
import { Repository } from "typeorm";
import { Talk, User } from "../../entities";
import { AppError } from "../../errors";
import schemas from "../../schemas";
import { iTalkCreateReturn } from "../../interfaces";
import { USER_NOT_FOUND_BY_ID } from "../../constraints/messages";

async function create(members: string[]): Promise<iTalkCreateReturn> {
    const talkRepository: Repository<Talk> = AppDataSource.getRepository(Talk);
    const userRepository: Repository<User> = AppDataSource.getRepository(User);
    
    const usersFound: Promise<User[]> = Promise.all(members.map(async(id) => {
        const userFound = await userRepository.findOneBy({ id });
        if (!userFound) throw new AppError(USER_NOT_FOUND_BY_ID + id, 404);
        return userFound;
    }));

    const users: User[] = await usersFound;

    const talk: Talk = talkRepository.create({
        members: users
    });
        
    await talkRepository.save(talk);

    return schemas.talk.returnTalkWithoutMessages.parse(talk);
}

export default create;
