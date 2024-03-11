import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ShowService } from './show.service';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/types/roles.type';
import { CreateShowDto } from './dto/createShow.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';

@Controller('show')
export class ShowController {
    constructor(private readonly showService: ShowService) {}

    @UseGuards(RolesGuard)
    @Roles(Role.Entertainer)
    @Post('create')
    async createShow (@Body() createShowDto: CreateShowDto ) {
    const showInfo = await this.showService.createShow(createShowDto)
        return { message : "공연 등록이 완료되었습니다." , showInfo }
    }







}
