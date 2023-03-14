import { Repository } from "typeorm";
import { Talk } from "../../entities";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";

async function remove(idTalk: string): Promise<void> {
    const talkRepository: Repository<Talk> = AppDataSource.getRepository(Talk);
    
    await talkRepository.softRemove({ id: idTalk });
    
    
}

export default remove;