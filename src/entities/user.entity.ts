import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    BeforeInsert,
    BeforeUpdate,
    ManyToMany
} from "typeorm";
import { iStatus } from "../interfaces";
import { hashSync, getRounds } from "bcryptjs";
import { Talk } from "./talk.entity";

@Entity("users")
export class User {

    @PrimaryGeneratedColumn("uuid")
    id: string;
    
    @Column({ type: "varchar", length: 100 })
    name: string;
    
    @Column({ type: "varchar", length: 120, unique: true })
    email: string;
    
    @Column({ type: "date" })
    birthDate: Date;
    
    @Column({ type: "text", nullable: true })
    description?: string | null | undefined;
    
    @Column({ type: "varchar", length: 20, enum: ["active", "busy", "absent"], default: "active" })
    status: iStatus; 

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deleteAt: Date;
    
    @Column({ type: "varchar", length: 120 })
    password: string;

    @ManyToMany(() => Talk, (talk) => talk.members)
    talks: Talk[];

    @BeforeInsert()
    @BeforeUpdate()
    hashPasswd() {
        const isEncrypted: number = getRounds(this.password);
        if (!isEncrypted) this.password = hashSync(this.password, 10);
    }

}

