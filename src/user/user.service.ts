import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import _ from 'lodash';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/sign-up.dto';


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
        private readonly jwtService: JwtService,
      ) {}
    // 회원가입
    async signup(signupDto : SignUpDto) {
      // 비밀번호 최소 글자수 설정
      if (signupDto.password.length < 4) {
        throw new ConflictException (
          "비밀번호는 4글자 이상 입력해주세요"
        )
      }
      // 비밀번호 확인 체크
      if ( signupDto.password !== signupDto.confirmPassword) {
        throw new ConflictException (
          "비밀번호가 서로 일치하지 않습니다."
        )
      }
      // 이메일 중복 체크
      const existingUser = await this.findUserEmail(signupDto.email);
      if (existingUser) {
      throw new ConflictException(
        '이미 해당 이메일로 가입된 사용자가 있습니다!',
      )
      }
      // 이름 중복 체크
      const findUserName = await this.userRepository.findOne({
      where : {
        userName : signupDto.name
      }
      })
      if (findUserName) {
      throw new ConflictException (
        "이미 등록된 이름이 있습니다."
      )
      }
      // 닉네임 중복 체크
      const findUserNickName = await this.userRepository.findOne({
      where : {
        userNickName : signupDto.nickname
      }
      })
      if (findUserNickName) {
      throw new ConflictException (
        "이미 등록된 닉네임이 있습니다."
      )
      }
      // 카드 번호 중복 체크
      const findCardNumber = await this.userRepository.findOne({
      where : {
        cardNumber : signupDto.cardnumber
      }
      })
      if (findCardNumber) {
      throw new ConflictException (
        "이미 등록된 카드번호가 있습니다."
      )
      }
      // 비밀번호 암호화
      const hashedPassword = await bcrypt.hash(signupDto.password, 10);
  
      // 회원가입 유저 정보 저장
      await this.userRepository.save({
      userEmail : signupDto.email,
      userPassword : hashedPassword,
      userNickName : signupDto.nickname,
      userName : signupDto.name,
      userContact : signupDto.contact,
      cardNumber : signupDto.cardnumber,
      cardPassword : signupDto.cardpassword
      });
      // 클라이언트 리턴값
      const signupInfo = await this.userRepository.findOne({
      where : {
        userEmail : signupDto.email
      },
      select : {
        userId : true,
        userEmail : true,
        userNickName : true,
        userName : true,
        userContact : true
      }
      })
      return { signupInfo }
    }

    // 로그인
    async signin(email : string, password : string) {
      const user = await this.userRepository.findOne({
        where: { userEmail : email },
        select: {
          userEmail : true,
          userPassword : true
        },
        
      });

      if (_.isNil(user)) {
        throw new UnauthorizedException('이메일을 확인해주세요.');
      }
      if (!(await bcrypt.compare(password, user.userPassword))) {
        throw new UnauthorizedException('비밀번호를 확인해주세요.');
      }
      // 페이로드가 이메일을 담고 있다!
      const payload = { email, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
    }

    // 유저 목록 조회
    async userList() {
      const userList = await this.userRepository.find({
        select : {
          userId : true,
          userNickName : true,
          userName : true
        }
      })
      return userList
    }

    // 로그인한 사용자 정보 삭제
    async deleteUser(user : User, password : string) {
      const savedPassword = await this.userRepository.findOne({
        where : {
          userEmail : user.userEmail
        },
        select : {
          userPassword : true
        }
      })
    
      if (!(await bcrypt.compare(password, savedPassword.userPassword))) {
        throw new UnauthorizedException('비밀번호를 확인해주세요.');
      }
      
      this.userRepository.delete({
        userEmail : user.userEmail
      })
    }

    // const payload - findByEmail - jwt strategy 연계
    async findUserEmail(email: string) {
        return await this.userRepository.findOneBy({ userEmail : email });
    }
}
