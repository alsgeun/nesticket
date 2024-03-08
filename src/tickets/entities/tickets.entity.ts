import { Show } from "src/show/entities/show.entity";
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

    @Column({ type: 'bigint', select: false, nullable: false })
    userId : number

    @Column({ type : 'bigint', nullable: false })
    ticketPrice : number
}