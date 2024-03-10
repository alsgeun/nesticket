import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class EntSignUpDto {
    @IsEmail()
    @IsNotEmpty({ message: '이메일을 입력해주세요.' })
    email : string
  
    @IsString()
    @IsNotEmpty({ message: '비밀번호를 입력해주세요.' })
    password : string
  
    @IsString()
    @IsNotEmpty({ message: '비밀번호가 일치하지 않습니다.' })
    confirmPassword : string
  
    @IsString()
    @IsNotEmpty({ message: '닉네임을 입력하세요.' })
    nickname : string
  
    @IsString()
    @IsNotEmpty({ message : "이름을 입력하세요." })
    name : string
  
    @IsString()
    @IsNotEmpty({ message : "연락처를 입력하세요." })
    contact : string
  
  } // 회원가입시 위에 사항들을 입력하도록 설정