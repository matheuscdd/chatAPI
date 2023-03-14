import { Repository, createQueryBuilder } from "typeorm";
import { AppDataSource } from "../../data-source";
import { Talk } from "../../entities";
import { iTalkCreateReturn } from "../../interfaces";
import schemas from "../../schemas";

async function find(id: string): Promise<iTalkCreateReturn> {
    const talkRepository: Repository<Talk> = AppDataSource.getRepository(Talk);

    const talk = await talkRepository
        .createQueryBuilder("talk")
        .where("talk.id = :id", { id })
        .leftJoinAndSelect("talk.members", "members")
        .leftJoinAndSelect("talk.messages", "messages")
        .orderBy("messages", "DESC")
        .getOne()

    console.log(talk)
    return schemas.talk.returnTalk.parse(talk);
}

export default find;