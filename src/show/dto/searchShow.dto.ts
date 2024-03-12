import { IsString } from "class-validator";

export class SearchShowDto {
    @IsString()
    title : string;
  }