import { Repository } from "typeorm";
import { Talk } from "../../entities";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";

async function remove(idTalk: string, idUser: string): Promise<void> {
    const talkRepository: Repository<Talk> = AppDataSource.getRepository(Talk);

    const talk: Talk | null = await talkRepository
        .createQueryBuilder("talk")
        .innerJoinAndSelect("talk.members", "users", "users.id = :idUser", { idUser })
        .where("talk.id = :idTalk", { idTalk })
        .getOne()

    if (!talk) throw new AppError(`You're not member of this talk`, 409);
    
    await talkRepository.softRemove({ id: idTalk });
}

export default remove;