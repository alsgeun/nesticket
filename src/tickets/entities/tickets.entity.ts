import { Seat } from "src/seat/entities/seat.entity";
import { Show } from "src/show/entities/show.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    name: 'tickets',
  })
export class Tickets {
    @PrimaryGeneratedColumn()
    ticketId : number

    @ManyToOne(() => Show, (show) => show.tickets)
    @JoinColumn([{ referencedColumnName : 'showId', name : 'showId' }])
    show : Show

    @Column({ type: 'bigint', name : 'showId', nullable: false })
    showId : number

    @OneToMany(() => Seat, (seats) => seats.ticket)
    seats : Seat[]

    @ManyToOne(() => User, (user) => user.tickets)
    @JoinColumn([{ referencedColumnName : 'userId', name : 'userId' }])
    user : User
    
    @Column({ type: 'bigint', name : 'userId', nullable: false })
    userId : number

    @Column({ type : 'bigint', nullable: false })
    ticketPrice : number
}