import { IsEmail, IsNotEmpty, IsNumber, IsString, Length } from "class-validator";

// DTO : 데이터 전송 오브젝트. 클라이언트의 데이터 요청,응답시 사용하게 되는 것
export class SignUpDto {
  @IsEmail()
  @IsNotEmpty({ message: '이메일을 입력해주세요.' })
  email : string

  @IsString()
  @IsNotEmpty({ message: '비밀번호를 입력해주세요.' })
  @Length(4, 255, { message: '비밀번호는 4글자 이상 입력해주세요' })
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

  @IsString()
  @IsNotEmpty({ message: '카드 번호를 입력해주세요.' })
  cardnumber : string

  @IsNumber()
  @IsNotEmpty({ message: '카드 비밀번호를 입력해주세요.' })
  cardpassword: number
} // 회원가입이 위에 사항들을 입력하도록 설정..너무 많은 거 같긴 한데..