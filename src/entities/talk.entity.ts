import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    ManyToMany,
    JoinTable,
    AfterLoad,
    AfterInsert,
    AfterUpdate,
    AfterRemove,
    AfterRecover
} from "typeorm";
import { User } from "./user.entity";

@Entity("talks")
export class Talk {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deleteAt: Date | null;

    @ManyToMany(() => User, (user) => user.talks)
    @JoinTable()
    members: User[];


    @AfterInsert()
    @AfterUpdate()
    @AfterRemove()
    @AfterRecover()
    Dater() {
        const handleDate = (time: Date): Date => {
            const date = new Date(time);
            return new Date(date.setUTCMinutes(date.getUTCMinutes() - 180));
        }
        this.createdAt = handleDate(this.createdAt);
        this.updatedAt = handleDate(this.updatedAt);
        this.deleteAt ? this.deleteAt = handleDate(this.deleteAt) : null;
    }

}

