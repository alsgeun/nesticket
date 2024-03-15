import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tickets } from './entities/tickets.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { Show } from 'src/show/entities/show.entity';
import { Seat } from 'src/seat/entities/seat.entity';

@Injectable()
export class TicketsService {
  constructor(
    @InjectRepository(Tickets)
    private ticketsRepository: Repository<Tickets>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Show)
    private showRepository: Repository<Show>,
    @InjectRepository(Seat)
    private seatRepository: Repository<Seat>,
  ) {}

  // 티켓 구매
  async buyingTickets(user: User, showId: number) {
    const userId = user.userId;
    // 공연 정보 조회
    const show = await this.showRepository.findOne({
      where: {
        showId: +showId,
      },
      select: {
        seats: {
          seatNumber: true,
          buyingPossible: true,
          seatPrice: true,
        },
      },
      relations : ['seats']
    });
    if (!show) {
      throw new NotFoundException('공연이 없습니다.');
    }

    // 예매 내역 생성
    const buyingTrace = await this.ticketsRepository.save({
      userId,
      showId,
    });
  
    // 포인트 차감 -> show 가격 정보  
    //Optional Chaining 연산자 사용
    let price = 0; 
    if (show && show.seats && show.seats.length > 0) {  // 공연,공연의 좌석,공연의 좌석여부가 있다면
      price = show.seats[0].seatPrice;      // 좌석 가격을 price 변수에 할당
    }
    console.log(price)
    const userInfo = await this.userRepository.findOneBy({
      userId: +userId,
    });
    
    await this.userRepository.update(userId, {
      Point : userInfo.Point - price
    });

    // 좌석 갯수 줄이기
    // 좌석 정보 가져오기
    const seat = await this.seatRepository.findOneBy({
      showId,
    });
    if (!seat) {
      throw new NotFoundException('해당 좌석 정보가 없습니다.');
    }
    // -1 하기 위해 숫자로 변환
    const updatedSeatNumber = Number(seat.seatNumber) - 1;  // 구매가능 좌석이 없어서 일단 전체좌석으로 설정..
    await this.seatRepository.save({
      seatId: seat.seatId,
      seatNumber: updatedSeatNumber.toString(), // 원래대로 돌리기 위해 문자열로 변환
    });
    return buyingTrace;
  }

  // 구매 목록 조회
  async ticketTrace(user : User) {
    const userId = user.userId
    const trace = await this.ticketsRepository.find({
      where : {
        userId
      },
      select : {
        show : {
        showId: true,
        showTitle: true,
        showVenue: true,
        showSchedule: true,
        }
      },
      relations : ['show']
    })
    if (trace.length == 0) {
      throw new NotFoundException ('구매 내역이 없습니다.')
    } 
    return trace
  }

  // 구매 목록 상세조회
  async detailedTicketsTrace (user : User , ticketId : number) {
    const myUserId = user.userId
    const detailedTckTrace = await this.ticketsRepository.findOne({
      where : {
        ticketId : ticketId,
        userId : myUserId
      },
      relations : {
        show : true
      }
    })
    if (!detailedTckTrace) {
      throw new NotFoundException('구매 내역을 찾을 수 없습니다.')
    }
    return detailedTckTrace
  }
}
