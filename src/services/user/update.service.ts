import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { iStatus, iStatusReq, iUserUpdate, iUserWithoutPwd } from "../../interfaces";
import schemas from "../../schemas";

async function entire(newUserData: iUserUpdate, id: string): Promise<iUserWithoutPwd> {
    const userRepository: Repository<User> = AppDataSource.getRepository(User);
    
    const oldUserData: User | null = await userRepository.findOneBy({ id });

    const user: User = userRepository.create({
        ...oldUserData,
        ...newUserData
    });

    await userRepository.save(user);

    return schemas.user.removePwd.parse(user);
}

async function status(newStatus: iStatusReq, id: string): Promise<iUserWithoutPwd> {
    const userRepository: Repository<User> = AppDataSource.getRepository(User);

    const oldUserData: User | null = await userRepository.findOneBy({ id });
    const user: User = userRepository.create({
        ...oldUserData,
        ...newStatus
    });
    
    await userRepository.save(user);
    
    return schemas.user.removePwd.parse(user);
}

export default {
    entire,
    status
}