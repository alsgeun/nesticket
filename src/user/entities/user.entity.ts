import { Show } from 'src/show/entities/show.entity';
import { Column, Entity, Index, JoinColumn, OneToMany, PrimaryGeneratedColumn } from 'typeorm';


@Entity({
  name: 'users',
})
// user 라는 테이블을 대표하는 객체
// 이걸 통해 db와 orm이 통신함
export class User {
  @PrimaryGeneratedColumn()
  @OneToMany(() => Show, (show) => show.userId)
  @JoinColumn({ name : 'userId'})
  userId: number;

  @Column({ type: 'bigint', select: false, nullable: false })
  showId : number

  @Column({ type: 'bigint', select: false, nullable: false })
  ticketId : number

  @Column({ type: 'varchar', unique: true, nullable: false })
  userEmail: string;

  @Column({ type: 'varchar', select: false, nullable: false })
  userPassword: string;

  @Column({ type: 'varchar', unique : true, nullable: false })
  userName : string

  @Column({ type: 'varchar', nullable: false })
  userContact : string
  
}