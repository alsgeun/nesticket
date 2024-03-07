import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Category } from "../types/showCategory.type";
import { User } from "src/user/entities/user.entity";
import { Entertainers } from "src/entertainers/entities/entertainers.entitiy";
import { Tickets } from "src/tickets/entities/tickets.entity";

@Entity({
  name: 'show',
})
// user 라는 테이블을 대표하는 객체
// 이걸 통해 db와 orm이 통신함
export class Show {
  @PrimaryGeneratedColumn()
  @OneToMany(() => Tickets, (tickets) => tickets.showId)
  @JoinColumn({ name : 'showId'})
  showId: number;

  @ManyToOne(() => Entertainers, (entertainers) => entertainers.entId)
  @JoinColumn({ name : 'entId'})
  entId : number

  // user 1:N show 관계 정의
  // ()=> User : User라는 테이블 지정
  // (users) => user.showId : User 엔티티 내에서 show와의 관계 정의, User 엔티티의 showId 필드 참조
  // 외래키인 'userId' 지정해서 엔티티간 연결,
  // 각 엔티티속 userId 끼리 매핑
  @ManyToOne(() => User,(users) => users.showId)
  @JoinColumn({ name : 'userId'})
  userId : number

  @Column({ type: 'bigint', select: false, nullable: false })
  ticketId : number

  @Column({ type: 'varchar', select: true, nullable: false })
  showTitle : string

  @Column({ type: 'varchar', select: true, nullable: false })
  showContent : string

  @Column({ type: 'varchar', select: true, nullable: false })
  showSchedule : Date

  @Column({ type: 'varchar', select: true, nullable: false })
  showPerformer : string

  @Column({
    type: 'enum', enum: Category,
    default: Category.temporary, select: true})
  showCategory : Category

  
}