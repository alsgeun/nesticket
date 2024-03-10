import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Request as RequestType } from 'express';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import _ from 'lodash';
import { ConfigService } from '@nestjs/config';
import { EntService } from 'src/entertainers/entertainers.service';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserService,
    private readonly entService: EntService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([JwtStrategy.extractJWT]),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET_KEY,
    });
  }
  private static extractJWT(req: RequestType): string | null {
    const { authorization } = req.cookies;
    if (authorization) {
      const [tokenType, token] = authorization.split(' ');
      if (token) {
        return token;
      }
    }
    return null;
  }
  async validate(payload: any) {
    const user = await this.userService.findUserEmail(payload.email);
    const ent = await this.entService.findByEntEmail(payload.email)
    console.log("-----------------------------------------")
    console.log(user)
    console.log(ent)
    if (_.isNil(user) && _.isNil(ent)) {
      throw new NotFoundException('해당하는 사용자를 찾을 수 없습니다.');
    }
    console.log("aa-------------aa")
    console.log(ent)
    console.log(user)
    return  user !== null ? user : ent
  }
}