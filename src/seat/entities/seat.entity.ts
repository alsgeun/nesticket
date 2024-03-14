import { Show } from "src/show/entities/show.entity";
import { Tickets } from "src/tickets/entities/tickets.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Possible } from "../types/buyingPossible.type";

@Entity({
    name: 'seat',
  })
export class Seat {
    @PrimaryGeneratedColumn()
    seatId : number

    @ManyToOne(() => Show, (show) => show.seats)
    @JoinColumn([{ referencedColumnName : 'showId', name : 'showId' }])
    show : Show

    @Column({ type: 'bigint', name : 'showId', nullable: false })
    showId : number

    @ManyToOne(() => Tickets, (tickets) => tickets.seats)
    @JoinColumn([{ referencedColumnName : 'ticketId', name : 'ticketId' }])
    ticket : Tickets
    
    @Column({ type : 'bigint', name : 'ticketId', nullable: true})
    ticketId : number

    @Column({ type : 'varchar', nullable: false})
    seatNumber : string

    @Column({ type : 'enum', enum : Possible, default: Possible.true, nullable: false })
    buyingPossible : Possible

    @Column({ type : 'varchar', nullable: false})
    seatPrice : number
}
