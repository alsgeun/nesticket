import { Show } from "src/show/entities/show.entity";
import { Role } from "src/types/roles.type";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name : 'entertainers',
})
export class Entertainers {
    @PrimaryGeneratedColumn()
    @OneToMany(() => Show, (show) => show.entId)
    @JoinColumn({ name : 'entId'})
    entId : number

    @Column({ type: 'bigint', select: false, nullable: false })
    showId : number

    @Column({ type : 'varchar', unique : true, nullable : false })
    entEmail : string

    @Column({ type: 'varchar', select: false, nullable: false })
    entPassword : string
    
    @Column({ type: 'varchar', unique : true, nullable: false })
    entNickName : string

    @Column({ type: 'varchar', unique : true, nullable: false })
    entName : string

    @Column({ type: 'varchar', nullable: false })
    entContact : string

    @Column({ type: 'enum', enum: Role, default: Role.Entertainer })
    role: Role;
}