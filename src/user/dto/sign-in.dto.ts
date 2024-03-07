import { IsEmail, IsNotEmpty, IsString } from "class-validator";

// DTO : 데이터 전송 오브젝트. 클라이언트의 데이터 요청,응답시 사용하게 되는 것
export class SignInDto {
    @IsEmail()
    @IsNotEmpty({ message: '이메일을 입력해주세요.' })
    email: string;
  
    @IsString()
    @IsNotEmpty({ message: '비밀번호를 입력해주세요.' })
    password: string;
  
  } // 로그인할 때 위에 사항들을 입력하도록 설정