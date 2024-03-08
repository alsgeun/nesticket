import { Body, Controller, Get, HttpStatus, Post, Res, UseGuards } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { UserService } from './user.service';
import { SignInDto } from './dto/sign-in.dto';
import { AuthGuard } from '@nestjs/passport';
import { UserInfo } from 'src/utils/userInfo.decorator';
import { User } from './entities/user.entity';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('sign-up')
   async signup(@Body() signupDto: SignUpDto ) {
  const userInfo = await this.userService.signup(signupDto.email, signupDto.password, signupDto.confirmPassword, signupDto.name, signupDto.contact);
  return { message: "회원가입이 완료되었습니다.", userInfo }
  }

  @Post('sign-in')
  async signin(@Body() signinDto: SignInDto, @Res() res) {
  const user = await this.userService.signin(signinDto.email, signinDto.password);
  res.cookie('authorization', `Bearer ${user.access_token}`)
  res.send('로그인 성공')
}
  
  
  // 로그인한 사용자 정보 조회
  @UseGuards(AuthGuard('jwt'))  // 가드를 getEmail 이라는 함수에 대해서만 쓸 것이다.
  @Get('email')                 // AuthGuard는 nest.js에서 제공하는 가드(jwt를 통한)
  getEmail(@UserInfo() user: User) {
    return {
      userId : user.userId,
      email: user.userEmail,
      name : user.userName,
      contact : user.userContact
    };
  }
}
