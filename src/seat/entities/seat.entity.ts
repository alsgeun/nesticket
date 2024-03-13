import { Show } from "src/show/entities/show.entity";
import { Tickets } from "src/tickets/entities/tickets.entity";
import { Column, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

export class Seat {
    @PrimaryGeneratedColumn()
    seatId : number

    @ManyToOne(() => Show, (show) => show.seats)
    @JoinColumn([{ referencedColumnName : 'showId', name : 'showId' }])
    show : Show

    @Column({ type: 'bigint', name : 'entId', nullable: false })
    showId : number

    @ManyToOne(() => Tickets, (tickets) => tickets.seats)
    @JoinColumn([{ referencedColumnName : 'ticketId', name : 'ticketId' }])
    ticket : Tickets
    
    @Column({ type : 'bigint', nullable: false})
    ticketId : number

    @Column({ type : 'varchar', nullable: false})
    seatNumber : string

    @Column({ type : 'bigint', nullable: false})
    buyingPossible : boolean

    @Column({ type : 'varchar', nullable: false})
    seatPrcie : number
}
