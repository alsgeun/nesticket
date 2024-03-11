import { Show } from 'src/show/entities/show.entity';
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
  // user 1:N show 관계 정의
  // ()=> User : User라는 테이블 지정
  // (users) => user.showId : User 엔티티 내에서 show와의 관계 정의, User 엔티티의 showId 필드 참조
  // 외래키인 'userId' 지정해서 엔티티간 연결,
  // 각 엔티티속 userId 끼리 매핑
  @OneToMany(() => Show, (show) => show.userId)
  @OneToMany(() => Tickets, (tickets) => tickets.userId)
  @JoinColumn({ name : 'userId'})
  userId: number

  @Column({ type: 'bigint', select: false, nullable: false })
  showId : number
  
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