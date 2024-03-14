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
    //Optional Chaining 연산자 사용, 비어있지 않은 경우 seatPrice 반환
    let price = 0; 
    if (show && show.seats && show.seats.length > 0) {
      price = show.seats[0].seatPrice;
    }

    const userInfo = await this.userRepository.findOneBy({
      userId: +userId,
    });
    userInfo.Point = userInfo.Point - price;

    await this.userRepository.save(userInfo);

    // 좌석 갯수 줄이기
    // 좌석 정보 가져오기
    const seat = await this.seatRepository.findOneBy({
      showId,
    });
    if (!seat) {
      throw new NotFoundException('해당 좌석 정보가 없습니다.');
    }
    // -1 하기 위해 숫자로 변환
    const updatedSeatNumber = Number(seat.seatNumber) - 1;
    await this.seatRepository.save({
      seatId: seat.seatId,
      seatNumber: updatedSeatNumber.toString(), // 원래대로 돌리기 위해 문자열로 변환
    });
    return buyingTrace;
  }
}
