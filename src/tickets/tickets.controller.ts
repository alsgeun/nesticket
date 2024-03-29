import { Controller, Get, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/types/roles.type';
import { UserInfo } from 'src/utils/userInfo.decorator';
import { User } from 'src/user/entities/user.entity';

@Controller('tickets')
export class TicketsController {
    constructor (private readonly ticketsService : TicketsService){}

    @UseGuards(RolesGuard)
    @Roles(Role.User)
    @Post(':showId')
    async buyingTickets (@UserInfo() user : User,@Param('showId') showId: number){
    const data = await this.ticketsService.buyingTickets(user, showId)
        return {
        statusCode : HttpStatus.CREATED,
        message : '공연 구매에 성공 했습니다.',
        data
    }
    }

    // 구매 목록 조회
    @UseGuards(RolesGuard)
    @Roles(Role.User)
    @Get()
    async ticketTrace(@UserInfo() user : User) {
        const trace = await this.ticketsService.ticketTrace(user)
        return { trace }
    }

    // 구매 내역 상세조회
    @UseGuards(RolesGuard)
    @Roles(Role.User)
    @Get(':ticketId')
    async detailedTicketsTrace(@UserInfo() user : User, @Param('ticketId') ticketId : number) {
        const detailedTckTrace = await this.ticketsService.detailedTicketsTrace(user, ticketId)
        return detailedTckTrace
    }
}
