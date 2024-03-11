import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Show } from './entities/show.entity';
import { CreateShowDto } from './dto/createShow.dto';
import { Category } from './types/showCategory.type';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ShowService {
    // 서비스 만들때는 항상 먼저하면 좋을 것
    // 1. 서비스가 제공하는 비즈니스 로직들의 레이아웃을 먼저 하는 것 -> 함수의 시그니처를 작성하는 것
    // 2. 생성자를 통해서 필요한 친구들을 DI 하는 것
    // 그럼 여기서 뭐가 필요하지?
    constructor(
        @InjectRepository(Show)
        private showRepository: Repository<Show>,
        private readonly jwtService: JwtService,
      ) {}
    
      // 공연 등록
     async createShow (createShowDto : CreateShowDto) {
        // 공연 제목 최소 글자수 설정
        if (createShowDto.title.length < 2) {
            throw new ConflictException (
              "공연 제목은 2글자 이상 입력해주세요"
            )
          }
        if (createShowDto.venue.length < 2) {
            throw new ConflictException (
              "장소는 2글자 이상 입력해주세요"
            )
          }
        if (createShowDto.content.length < 4) {
            throw new ConflictException (
              "공연 내용은 4글자 이상 입력해주세요"
            )
          }
        if (createShowDto.schedule.length < 8) {
            throw new ConflictException (
              "공연 일정은 8글자 이상 입력해주세요"
            )
          }
        if (createShowDto.performer.length < 2) {
            throw new ConflictException (
              "출연진은 2글자 이상 입력해주세요"
            )
          }
        if (!Object.values(Category).includes(createShowDto.category)) {
            throw new ConflictException("존재하지 않는 카테고리입니다.");
          } // Category속 내용물을 배열 형태로 전환하고,
          // includes를 통해 dto속 category값이 변환된 Category 중 일치하는 것이 있는지 확인
          
        const showInfo = await this.showRepository.save ({
            showTitle : createShowDto.title,
            showVenue : createShowDto.venue,
            showContent : createShowDto.content,
            showSchedule : createShowDto.schedule,
            showPerformer : createShowDto.performer,
            showCategory : createShowDto.category 
        })
        return showInfo
     }
}
