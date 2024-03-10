import { Module } from '@nestjs/common';
import { EntService } from './entertainers.service';
import { EntController } from './entertainers.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Entertainers } from './entities/entertainers.entitiy';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET_KEY'),
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Entertainers, User]),
  ],
  providers: [EntService, JwtModule],
  controllers: [EntController],
  exports: [EntService],
})
export class EntertainersModule {}
