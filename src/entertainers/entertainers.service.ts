import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Entertainers } from './entities/entertainers.entitiy';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { EntSignUpDto } from './dto/entSignUp.dto';
import * as bcrypt from 'bcrypt';
import _ from 'lodash';
import { User } from 'src/user/entities/user.entity';


@Injectable()
export class EntService {
  constructor(
    @InjectRepository(Entertainers)
    private entRepository: Repository<Entertainers>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  // 회원가입
  async signup(entSignUpDto: EntSignUpDto) {
    // 비밀번호 최소 글자수 설정
    if (entSignUpDto.password.length < 4) {
      throw new ConflictException('비밀번호는 4글자 이상 입력해주세요');
    }
    // 비밀번호 확인 체크
    if (entSignUpDto.password !== entSignUpDto.confirmPassword) {
      throw new ConflictException('비밀번호가 서로 일치하지 않습니다.');
    }
    // 이메일 중복 체크
    const existingEnt = await this.findByEntEmail(entSignUpDto.email);
    const existingUser = await this.findByUserEmail(entSignUpDto.email)
    if (existingEnt || existingUser) {
      throw new ConflictException(
        '이미 해당 이메일로 가입된 사용자가 있습니다!',
      );
    }
    // 이름 중복 체크
    const findEntName = await this.entRepository.findOne({
      where: {
        entName: entSignUpDto.name,
      },
    });
    const findUserName = await this.userRepository.findOne({
        where: {
          userName: entSignUpDto.name,
        },
      });
    if (findEntName || findUserName) {
      throw new ConflictException('이미 등록된 이름이 있습니다.');
    }
    // 닉네임 중복 체크
    const findEntNickName = await this.entRepository.findOne({
      where: {
        entNickName: entSignUpDto.nickname,
      },
    });
    const findUserNickName = await this.userRepository.findOne({
        where: {
          userNickName: entSignUpDto.nickname,
        },
      });
    if (findEntNickName || findUserNickName) {
      throw new ConflictException('이미 등록된 닉네임이 있습니다.');
    }

    // 비밀번호 암호화
    const hashedPassword = await bcrypt.hash(entSignUpDto.password, 10);

    // 회원가입 유저 정보 저장
    await this.entRepository.save({
      entEmail: entSignUpDto.email,
      entPassword: hashedPassword,
      entNickName: entSignUpDto.nickname,
      entName: entSignUpDto.name,
      entContact: entSignUpDto.contact,
    });
    // 클라이언트 리턴값
    const signupInfo = await this.entRepository.findOne({
      where: {
        entEmail: entSignUpDto.email,
      },
      select: {
        entId: true,
        entEmail: true,
        entNickName: true,
        entName: true,
        entContact: true,
      },
    });
    return { signupInfo };
  }
  // 로그인
  async signin(email: string, password: string) {
    const ent = await this.entRepository.findOne({
      where: { entEmail: email },
      select: {
        entEmail: true,
        entPassword: true,
      },
    });
    if (_.isNil(ent)) {
      throw new UnauthorizedException('이메일을 확인해주세요.');
    }
    if (!(await bcrypt.compare(password, ent.entPassword))) {
      throw new UnauthorizedException('비밀번호를 확인해주세요.');
    }
    // 페이로드가 이메일을 담고 있다!
    const payload = { email, sub: ent.entId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  // 엔터테이너 목록 조회
  async entList() {
    const entList = await this.entRepository.find({
      select: {
        entId: true,
        entNickName: true,
        entName: true,
      },
    });
    return entList;
  }

  // 로그인한 엔터테이너 정보 삭제
  async deleteEnt(ent : Entertainers, password : string) {
    const savedPassword = await this.entRepository.findOne({
      where : {
        entEmail : ent.entEmail
      },
      select : {
        entPassword : true
      }
    })
  
    if (!(await bcrypt.compare(password, savedPassword.entPassword))) {
      throw new UnauthorizedException('비밀번호를 확인해주세요.');
    }
    
    this.entRepository.delete({
      entEmail : ent.entEmail
    })
  }
  // const payload - findByEmail - jwt strategy 연계
  async findByEntEmail(email: string) {
    console.log("aaaaa",email)
    return await this.entRepository.findOneBy({ entEmail: email });
  }

  async findByUserEmail(email: string) {
    return await this.userRepository.findOneBy({ userEmail: email });
  }
}
