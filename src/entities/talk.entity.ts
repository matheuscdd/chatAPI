import {
    Entity,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    DeleteDateColumn,
    ManyToMany,
    JoinTable,
    AfterInsert,
    AfterRemove,
    AfterRecover,
    OneToMany,
    AfterLoad
} from "typeorm";
import { User } from "./user.entity";
import { Message } from "./message.entity";

@Entity("talks")
export class Talk {

    @PrimaryGeneratedColumn("uuid")
    id: string;

    @CreateDateColumn()
    createdAt: Date;

    @DeleteDateColumn()
    deleteAt: Date | null;

    @ManyToMany(() => User, (user) => user.talks)
    @JoinTable()
    members: User[];

    @OneToMany(() => Message, (message) => message.talk)
    messages: Message[];

    @AfterInsert()
    @AfterRemove()
    @AfterRecover()
    @AfterLoad()
    Dater() {
        const handleDate = (time: Date): Date => {
            const date = new Date(time);
            return new Date(date.setUTCMinutes(date.getUTCMinutes() - 180));
        }
        this.createdAt = handleDate(this.createdAt);
        this.deleteAt ? this.deleteAt = handleDate(this.deleteAt) : null;
    }

}

