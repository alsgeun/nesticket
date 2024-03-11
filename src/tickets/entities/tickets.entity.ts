import { Show } from "src/show/entities/show.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'tickets',
  })
export class Tickets {
    @PrimaryGeneratedColumn()
    ticketId : number

    @ManyToOne(() => Show, (show) => show.showId)
    @JoinColumn({ name : 'showId'})
    showId : number

    @ManyToOne(() => User, (user) => user.userId)
    @JoinColumn({ name : 'userId'})
    @Column({ type: 'bigint', select: false, nullable: false })
    userId : number

    @Column({ type : 'bigint', nullable: false })
    ticketPrice : number
}