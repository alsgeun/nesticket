import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Show } from './entities/show.entity';
import { ShowService } from './show.service';
import { ShowController } from './show.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
    imports: [
      JwtModule.registerAsync({
        useFactory: (config: ConfigService) => ({
          secret: config.get<string>('JWT_SECRET_KEY'),
        }),
        inject: [ConfigService],
      }),
      TypeOrmModule.forFeature([Show]),
    ],
    providers: [ShowService],
    controllers: [ShowController],
    exports: [ShowService],
  })
export class ShowModule {}
