import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { Show } from './entities/show.entity';
import { CreateShowDto } from './dto/createShow.dto';
import { Category } from './types/showCategory.type';
import { JwtService } from '@nestjs/jwt';
import { Entertainers } from 'src/entertainers/entities/entertainers.entitiy';
import { UpdateShowDto } from './dto/updateShow.dto';
import { SearchShowDto } from './dto/searchShow.dto';
import { Seat } from 'src/seat/entities/seat.entity';
import { Coordinate } from 'src/seat/types/seatCoordinate.type';

@Injectable()
export class ShowService {
  // 서비스 만들때는 항상 먼저하면 좋을 것
  // 1. 서비스가 제공하는 비즈니스 로직들의 레이아웃을 먼저 하는 것 -> 함수의 시그니처를 작성하는 것
  // 2. 생성자를 통해서 필요한 친구들을 DI 하는 것
  // 그럼 여기서 뭐가 필요하지?
  constructor(
    @InjectRepository(Show)
    private showRepository: Repository<Show>,
    @InjectRepository(Seat)
    private seatRepository: Repository<Seat>,
    private readonly jwtService: JwtService,
  ) {}

  // 공연 등록
  async createShow(user: Entertainers, createShowDto: CreateShowDto) {

    if (!Object.values(Category).includes(createShowDto.category)) {
      throw new ConflictException('존재하지 않는 카테고리입니다.');
    } // Category속 내용물을 배열 형태로 전환하고,
    // includes를 통해 dto속 category값이 변환된 Category 중 일치하는 것이 있는지 확인
    
    const entId = user.entId;
    const showInfo = await this.showRepository.save({
      showTitle: createShowDto.title,
      showVenue: createShowDto.venue,
      showContent: createShowDto.content,
      showSchedule: createShowDto.schedule,
      showPerformer: createShowDto.performer,
      showCategory: createShowDto.category,
      entId: entId,
    });

    // 좌석 생성
    const seats: Seat[] = [];   // 없어도 되긴 한데..
    const ea = createShowDto.ea
    const coordinate = createShowDto.coordinate

    // for문을 돌며 입력한 값을 차례대로 할당
    for (let j = 0; j < coordinate.length; j++) {
      for (let i = 1; i <= ea; i++) {
        const seatNumber = `${coordinate[j]}-${i}`
      const seat = await this.seatRepository.save({
        showId : showInfo.showId,
        seatPrice : createShowDto.price,
        seatNumber: seatNumber,
      });
      seats.push(seat); // seats를 아직 안써먹을 거라 없어도 무관한데..
    }
    }
    return showInfo;
  }

  // 공연 수정
  async updateShow(
    user: Entertainers,
    showId: number,
    updateShowDto: UpdateShowDto,
  ) {
    const findShowId = await this.showRepository.findOne({
      where: {
        showId: +showId,
      },
      // loadRelationIds: true,
      relations: ['entertainer'],
      //select: ['entId'] 왜 이거만 쓰면 에러가 뜨는지..
    });
    if (!findShowId) {
      throw new NotFoundException('수정하려는 공연이 존재하지 않습니다.');
    }

    if (findShowId.entertainer.entId !== user.entId) {
      throw new ConflictException('본인 공연만 수정 가능합니다.');
    }
    await this.showRepository.update(showId, {
      // update에서 첫번째 인자는 where문의 역할을 함
      showTitle: updateShowDto.title,
      showVenue: updateShowDto.venue,
      showContent: updateShowDto.content,
      showSchedule: updateShowDto.schedule,
      showPerformer: updateShowDto.performer,
      showCategory: updateShowDto.category,
    });
    const updatedShow = await this.showRepository.findOne({
      where: {
        showId: showId,
      },
      select: {
        showTitle: true,
        showVenue: true,
        showContent: true,
        showSchedule: true,
        showPerformer: true,
        showCategory: true,
      },
    });
    return { updatedShow };
  }

  // 공연 목록
  async showList() {
    const showList = await this.showRepository.find({
      select: {
        showId: true,
        showTitle: true,
        showVenue: true,
        showSchedule: true,
        // seats : {
        //   seatNumber : true,
        //   buyingPossible : true,
        //   seatPrice : true
        // }
      },
      // relations: ['seats'],
    });
  //   const shows = await getConnection()
  // .createQueryBuilder(Show, "show")
  // .select(["show.showId", "show.showTitle"])
  // .addSelect(subQuery => {
  //   return subQuery
  //     .select(["seat.buyingPossible", "seat.seatPrice"])
  //     .from(Seat, "seat")
  //     .where("seat.showId = show.showId");
  // }, "seats")
  // .getMany();
    return showList;
  }

  // 공연 상세조회
  async detailShow(showId: number) {
    const detailShow = await this.showRepository.findOne({
      where: {
        showId: +showId,
      },
      select : {
        showId : true,
        entId : true,
        showTitle : true,
        showVenue : true,
        showContent : true,
        showSchedule : true,
        showPerformer : true,
        showCategory : true,
        seats : {
          seatNumber : true,
          buyingPossible : true,
          seatPrice : true
        }
      },
      relations: ['seats'],
    });
    if (!detailShow) {
      throw new NotFoundException('공연이 존재하지 않습니다.');
    }
    return detailShow;
  }

  // 공연 제목 검색
  async searchShowData(search: string) {
    const searchShowData = await this.showRepository.find({
      where: {
        showTitle: Like(`%${search}%`),
      },
      select: {
        showId: true,
        showTitle: true,
        showVenue: true,
        showSchedule: true,
      },
    });
    return searchShowData;
  }
}
