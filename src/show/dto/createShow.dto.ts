import { IsDate, IsEnum, IsNotEmpty, IsNumber, IsString, Length } from "class-validator";
import { Category } from "../types/showCategory.type";
import { Coordinate } from "src/seat/types/seatCoordinate.type";

// DTO : 데이터 전송 오브젝트. 클라이언트의 데이터 요청,응답시 사용하게 되는 것
export class CreateShowDto {
    @IsString()
    @IsNotEmpty({ message: '공연 이름을 입력해주세요.' })
    @Length(2, 100, { message : "공연 제목은 2글자 이상 입력해주세요" })
    title : string;
  
    @IsString()
    @IsNotEmpty({ message: '공연 장소를 입력해주세요.' })
    @Length(2, 100, { message : "장소는 2글자 이상 입력해주세요" })
    venue : string;

    @IsString()
    @IsNotEmpty({ message: '공연 내용을 입력해주세요.' })
    @Length(4, 255, {message : "공연 내용은 4글자 이상 입력해주세요"})
    content : string;
  
    @IsString()
    @IsNotEmpty({ message: '공연 일정을 입력해주세요.' })
    @Length(8, 100, {message : "공연 일정은 8글자 이상 입력해주세요"})
    schedule : string

    @IsString()
    @IsNotEmpty({ message: '출연진을 입력해주세요.' })
    @Length(2, 255, {message : "출연진은 2글자 이상 입력해주세요"})
    performer : string;

    @IsEnum(Category)
    @IsNotEmpty({ message: '카테고리를 설정해주세요.' })
    category : Category;

    @IsString({each:true}) // 배열로 받겠다.
    @IsNotEmpty({ message : '좌석 좌표를 입력해주세요.'})
    coordinate : string []  

    @IsNumber()
    @IsNotEmpty({ message : '좌석 갯수를 설정해주세요.'})
    ea : number

    @IsNumber()
    @IsNotEmpty({ message : '좌석 가격을 측정해주세요.'})
    price : number
  }