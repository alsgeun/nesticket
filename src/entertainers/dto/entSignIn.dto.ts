import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class EntSignInDto {
    @IsEmail()
    @IsNotEmpty({ message: '이메일을 입력해주세요.' })
    email: string;
  
    @IsString()
    @IsNotEmpty({ message: '비밀번호를 입력해주세요.' })
    password: string;
  
  } // 로그인할 때 위에 사항들을 입력하도록 설정