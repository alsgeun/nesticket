import { IsDate, IsEnum, IsNotEmpty, IsString } from "class-validator";
import { Category } from "../types/showCategory.type";

// DTO : 데이터 전송 오브젝트. 클라이언트의 데이터 요청,응답시 사용하게 되는 것
export class CreateShowDto {
    @IsString()
    @IsNotEmpty({ message: '공연 이름을 입력해주세요.' })
    title : string;
  
    @IsString()
    @IsNotEmpty({ message: '공연 장소를 입력해주세요.' })
    venue : string;

    @IsString()
    @IsNotEmpty({ message: '공연 내용을 입력해주세요.' })
    content : string;
  
    @IsString()
    @IsNotEmpty({ message: '공연 일정을 입력해주세요.' })
    schedule : string

    @IsString()
    @IsNotEmpty({ message: '출연진을 입력해주세요.' })
    performer : string;

    @IsEnum(Category)
    @IsNotEmpty({ message: '카테고리를 입력해주세요.' })
    category : Category;
  }