import { Show } from "src/show/entities/show.entity";
import { Tickets } from "src/tickets/entities/tickets.entity";
import { Column, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export class Seat {
    @PrimaryGeneratedColumn()
    @ManyToOne(() => Tickets, (tickets) => tickets.ticketId)
    seatId : number

    @ManyToOne(() => Show, (show) => show.showId)
    showId : number

    @Column({ type : 'bigint', nullable: false})
    ticketId : number

    @Column({ type : 'varchar', nullable: false})
    seatNumber : string

    @Column({ type : 'bigint', nullable: false})
    buyingPossible : boolean

    @Column({ type : 'varchar', nullable: false})
    seatPrcie : number
}
