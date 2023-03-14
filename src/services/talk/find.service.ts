import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Talk } from "../../entities";
import { iTalkCreateReturn } from "../../interfaces";
import schemas from "../../schemas";

async function find(id: string): Promise<iTalkCreateReturn> {
    const talkRepository: Repository<Talk> = AppDataSource.getRepository(Talk);

    const talk: Talk | null = await talkRepository
        .createQueryBuilder("talk")
        .where("talk.id = :id", { id })
        .leftJoinAndSelect("talk.members", "members")
        .leftJoinAndSelect("talk.messages", "messages")
        .orderBy("messages.createdAt", "DESC")
        .getOne()

    
    const updatedAt = talk?.messages[0].createdAt ?  talk!.messages[0].createdAt : talk!.createdAt;
    return schemas.talk.returnTalk.parse({...talk, updatedAt });
}

export default find;