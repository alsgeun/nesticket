import { User } from "src/user/entities/user.entity"
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"

@Entity({
    name: 'points',
  })
  // user 라는 테이블을 대표하는 객체
  // 이걸 통해 db와 orm이 통신함
  export class Points {
    @PrimaryGeneratedColumn()
    @Column({ type: 'bigint', select: false, nullable: false })
    pointId: number
  
    @Column({ type: 'bigint', nullable: false, default : 1000000 })
    Point : number
    
    @Column({ type: 'varchar' })
    pointHistory : string

    @ManyToOne(() => User, (user) => user.userId)
    userId : number
  }