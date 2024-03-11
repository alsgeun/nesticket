import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { JwtStrategy } from './jwt.strategy';
import { EntertainersModule } from 'src/entertainers/entertainers.module';
import { ShowModule } from 'src/show/show.module';

// jwt strategy 적용
@Module({
    imports: [
      // passport를 쓸 거고 기본적으론 jwt를 쓸 거다.   session : false == stateless
      PassportModule.register({ defaultStrategy: 'jwt', session: false }),
      JwtModule.registerAsync({
        useFactory: (config: ConfigService) => ({
          secret: config.get<string>('JWT_SECRET_KEY'),
        }),
        inject: [ConfigService],
      }),
      UserModule, EntertainersModule, ShowModule // 추가!
    ],
    providers: [JwtStrategy],
  })
  export class AuthModule {}