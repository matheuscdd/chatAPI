import { Repository } from "typeorm";
import { Message, Talk } from "../../entities";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";

async function lastUpdate(id: string) {
    const messageRepository: Repository<Message> = AppDataSource.getRepository(Message);

    const messages: Message | null = await messageRepository
        .createQueryBuilder("message")
        .where("message.talk = :id", { id })
        .orderBy("message.createdAt", "DESC")
        .getOne();

    if (!messages) throw new AppError(`Not found messages send yet`, 404);

    return { lastUpdate: messages.createdAt };
}

export default lastUpdate;