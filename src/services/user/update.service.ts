import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { iUserUpdate, iUserWithoutPwd } from "../../interfaces";
import schemas from "../../schemas";

export async function update(newUserData: iUserUpdate, id: string): Promise<iUserWithoutPwd> {
    const userRepository = AppDataSource.getRepository(User);
    
    const oldUserData: User | null = await userRepository.findOneBy({ id });

    const user: User = userRepository.create({
        ...oldUserData,
        ...newUserData
    });

    await userRepository.save(user);

    return schemas.user.removePwd.parse(user);
}