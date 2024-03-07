import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Show } from './entities/show.entity';

@Injectable()
export class ShowService {
    // 서비스 만들때는 항상 먼저하면 좋을 것
    // 1. 서비스가 제공하는 비즈니스 로직들의 레이아웃을 먼저 하는 것 -> 함수의 시그니처를 작성하는 것
    // 2. 생성자를 통해서 필요한 친구들을 DI 하는 것
    // 그럼 여기서 뭐가 필요하지?
    // constructor(
    //     @InjectRepository(Show) private showRepository: Repository<Show>,
    //     ) {}
}
