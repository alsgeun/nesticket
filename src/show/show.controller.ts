import { Body, Controller, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { ShowService } from './show.service';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/types/roles.type';
import { CreateShowDto } from './dto/createShow.dto';
import { RolesGuard } from 'src/auth/roles.guard';
import { EntInfo } from 'src/utils/entInfo.decorator';
import { Entertainers } from 'src/entertainers/entities/entertainers.entitiy';
import { UpdateShowDto } from './dto/updateShow.dto';
import { SearchShowDto } from './dto/searchShow.dto';

@Controller('show')
export class ShowController {
    constructor(private readonly showService: ShowService) {}

    // 공연 등록
    @UseGuards(RolesGuard)
    @Roles(Role.Entertainer)
    @Post('create')
    async createShow (@EntInfo() user: Entertainers, @Body() createShowDto: CreateShowDto ) {
    const showInfo = await this.showService.createShow(user,createShowDto)
        return { message : "공연 등록이 완료되었습니다." , showInfo }
    }

    // 공연 수정
    @UseGuards(RolesGuard)
    @Roles(Role.Entertainer)
    @Patch(':showId')
    async updateShow (@EntInfo() user: Entertainers, @Param('showId') showId: number, @Body() updateShowDto : UpdateShowDto) {
    const updatedShow = await this.showService.updateShow(user, showId, updateShowDto)
        return { message : "공연 수정이 완료되었습니다." , updatedShow}
    }

    // 공연 제목 검색
    @Get('search')
    async searchShow(@Query("search")search : string) {
        return  await this.showService.searchShowData(search)   
    }

    // 공연 목록 조회
    @Get()
    async showList() {
    const showList = await this.showService.showList()
    return { showList }
    }

    // 공연 상세 조회
    @Get(':showId')
    async detailShow(@Param('showId') showId: number) {
        const detailShow = await this.showService.detailShow(showId)
    return { detailShow }
    }    
}