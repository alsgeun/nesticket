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

    @ManyToOne(() => User, (users) => users.userId)
    @JoinColumn({ name : 'userId'})
    userId : number

    @Column({ type : 'bigint', nullable: false })
    ticketPrice : number
}