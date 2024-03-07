import { Body, Controller, Post } from '@nestjs/common';
import { SignUpDto } from './dto/sign-up.dto';
import { UserService } from './user.service';
import { SignInDto } from './dto/sign-in.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('sign-up')
   async signup(@Body() signupDto: SignUpDto) {
    const signupInfo = await this.userService.signup(signupDto.email, signupDto.password, signupDto.name, signupDto.contact);
    return signupInfo
    }

  @Post('sign-in')
  async signin(@Body() signinDto: SignInDto) {
    return await this.userService.signin(signinDto.email, signinDto.password);
  }
  // 가드를 getEmail 이라는 함수에 대해서만 쓸 것이다.
  // AuthGuard는 nest.js에서 제공하는 가드(jwt를 통한)
//   @UseGuards(AuthGuard('jwt'))
//   @Get('email')
//   getEmail(@UserInfo() user: User) {
//     return { email: user.email };
//   }
}
