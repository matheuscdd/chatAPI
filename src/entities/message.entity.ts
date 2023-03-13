import {
    Entity,
    Column,
    CreateDateColumn,
    PrimaryGeneratedColumn,
    ManyToOne
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
    createdAt: string;

}