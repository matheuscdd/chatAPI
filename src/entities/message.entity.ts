import {
    Entity,
    Column,
    CreateDateColumn,
    PrimaryGeneratedColumn,
    ManyToOne,
    AfterInsert,
    AfterLoad,
} from "typeorm";
import { User } from "./user.entity";
import { Talk } from "./talk.entity";

@Entity("messages")
export class Message {

    @PrimaryGeneratedColumn("uuid")
    id: string;
    
    @ManyToOne(() => User)
    from: User;
    
    @Column({ type: "text" })
    text: string;
    
    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => Talk, (talk) => talk.messages)
    talk: Talk;

    @AfterInsert()
    @AfterLoad()
    Dater() {
        const handleDate = (time: Date): Date => {
            const date = new Date(time);
            return new Date(date.setUTCMinutes(date.getUTCMinutes() - 180));
        }
        this.createdAt = handleDate(this.createdAt);
    }
}