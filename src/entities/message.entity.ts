import {
    Entity,
    Column,
    CreateDateColumn,
    PrimaryGeneratedColumn,
    ManyToOne,
    AfterInsert,
} from "typeorm";
import { User } from "./user.entity";

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

    @AfterInsert()
    Dater() {
        const handleDate = (time: Date): Date => {
            const date = new Date(time);
            return new Date(date.setUTCMinutes(date.getUTCMinutes() - 180));
        }
        this.createdAt = handleDate(this.createdAt);
    }
}