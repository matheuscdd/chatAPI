import { Repository } from "typeorm";
import { Message, Talk, User } from "../../entities";
import { AppDataSource } from "../../data-source";
import schemas from "../../schemas";

async function create(text: string, idUser: string, idTalk: string) {
    const messageRepository: Repository<Message> = AppDataSource.getRepository(Message);
    const userRepository: Repository<User> = AppDataSource.getRepository(User);
    const talkRepository: Repository<Talk> = AppDataSource.getRepository(Talk);

    const user: User | null = await userRepository.findOneBy({ id: idUser });
    const talk: Talk | null = await talkRepository.findOneBy({ id: idTalk });

    const message = messageRepository.create({
        text,
        talk: talk!,
        from: user!
    });

    await messageRepository.save(message);

    return schemas.message.returnMessageCreate.parse(message);
}

export default create;