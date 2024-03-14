import { Tickets } from 'src/tickets/entities/tickets.entity';
import { Role } from 'src/types/roles.type';
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';


@Entity({
  name: 'users',
})
// user 라는 테이블을 대표하는 객체
// 이걸 통해 db와 orm이 통신함
export class User {
  @PrimaryGeneratedColumn()
  userId: number

  @OneToMany(() => Tickets, (tickets) => tickets.user)
  tickets : Tickets[]

  @Column({ type: 'varchar', unique: true, nullable: false })
  userEmail: string;

  @Column({ type: 'varchar', select: false, nullable: false })
  userPassword: string;

  @Column({ type: 'varchar', unique : true, nullable: false })
  userNickName : string

  @Column({ type: 'varchar', unique : true, nullable: false })
  userName : string

  @Column({ type: 'varchar', nullable: false })
  userContact : string
  
  @Column({ type: 'enum', enum: Role, default: Role.User })
  role: Role;

  @Column({ type: 'bigint', nullable: false, default : 1000000 })
    Point : number

  @Column({ type: 'varchar', unique : true, select: false, nullable: false })
  cardNumber : string

  @Column({ type: 'bigint', select: false, nullable: false })
  cardPassword : number
}