import { Body, Controller, Delete, Get, Post, Res, UseGuards } from '@nestjs/common';
import { EntService } from './entertainers.service';
import { EntSignUpDto } from './dto/entSignUp.dto';
import { EntSignInDto } from './dto/entSignIn.dto';
import { AuthGuard } from '@nestjs/passport';
import { EntInfo } from 'src/utils/entInfo.decorator';
import { Entertainers } from './entities/entertainers.entitiy';
import { DeleteEntDto } from './dto/deleteEnt.dto';

@Controller('entertainers')
export class EntController {
  constructor(private readonly entService: EntService) {}

  @Post('sign-up')
  async signup(@Body() entSignUpDto: EntSignUpDto) {
    const entInfo = await this.entService.signup(entSignUpDto);
    return { message: '회원가입이 완료되었습니다.', entInfo };
  }

  @Post('sign-in')
  async signin(@Body() EntSignIpDto: EntSignInDto, @Res() res) {
    const user = await this.entService.signin(
    EntSignIpDto.email,
    EntSignIpDto.password,
    );
    res.cookie('authorization', `Bearer ${user.access_token}`);
    res.send('로그인 성공');
  }

  // 전체 사용자 목록 조회
  @Get()
  async entList() {
    const entList = await this.entService.entList();
    return { entList };
  }

   // 로그인한 사용자 정보 조회
   @UseGuards(AuthGuard('jwt'))  // AuthGuard는 nest.js에서 제공하는 가드(jwt를 통한)
   @Get('email')                
   getEmail(@EntInfo() user: Entertainers) { // 가드를 getEmail 이라는 함수에 대해서만 쓸 것이다.
    return {
       entId : user.entId,
       email: user.entEmail,
       nickName : user.entNickName,
       name : user.entName,
       contact : user.entContact,
     };
   }
   // 로그인한 엔터테이너 정보 삭제
  @UseGuards(AuthGuard('jwt'))
  @Delete()
  async deleteUser(@EntInfo() ent : Entertainers, @Body() deleteEntDto : DeleteEntDto) {
  await this.entService.deleteEnt(ent, deleteEntDto.password)
  return {message : "정보가 성공적으로 삭제 되었습니다."}
  }
}
