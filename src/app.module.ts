import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { ShowController } from './show/show.controller';
import { ShowService } from './show/show.service';
import { ShowModule } from './show/show.module';
import Joi from 'joi';
import { User } from './user/entities/user.entity';
import { Show } from './show/entities/show.entity';
import { EntertainersModule } from './entertainers/entertainers.module';
import { TicketsModule } from './tickets/tickets.module';
import { Entertainers } from './entertainers/entities/entertainers.entitiy';
import { Tickets } from './tickets/entities/tickets.entity';
import { AuthModule } from './auth/auth.module';
import { PointsModule } from './points/points.module';
import { SeatModule } from './seat/seat.module';

const typeOrmModuleOptions = {
  useFactory: async (
    configService: ConfigService, // 환경변수 연결(Injection)
  ): Promise<TypeOrmModuleOptions> => ({
    namingStrategy: new SnakeNamingStrategy(),
    type: 'mysql',
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    host: configService.get('DB_HOST'),
    port: configService.get('DB_PORT'),
    database: configService.get('DB_NAME'),
    entities: [User, Show, Entertainers, Tickets], // 엔티티는 반드시 여기에 명시!
    synchronize: configService.get('DB_SYNC'),
    logging: true,
  }),
  inject: [ConfigService],
};

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,   // joi를 통해 .env파일 검사
      validationSchema: Joi.object({
        JWT_SECRET_KEY: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_NAME: Joi.string().required(),
        DB_SYNC: Joi.boolean().required(),
      }),
    }),
    TypeOrmModule.forRootAsync(typeOrmModuleOptions),
    UserModule,
    ShowModule,
    EntertainersModule,
    TicketsModule,
    AuthModule,
    PointsModule,
    SeatModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
