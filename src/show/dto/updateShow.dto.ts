import { IsEnum, IsString } from "class-validator";
import { Category } from "../types/showCategory.type";

export class UpdateShowDto {
    @IsString()
    title : string;
  
    @IsString()
    venue : string;

    @IsString()
    content : string;
  
    @IsString()
    schedule : string

    @IsString()
    performer : string;

    @IsEnum(Category)
    category : Category;
  }