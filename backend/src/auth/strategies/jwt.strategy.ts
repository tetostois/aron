import { Injectable, UnauthorizedException } from '@nestjs/common';
import type { Request } from 'express';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../../users/users.service';

type JwtPayload = {
  sub: string;
  email: string;
  role: string;
};

type DoneFunction = (error: Error | null, user?: any) => void;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
      passReqToCallback: true,
    });
  }

  async validate(
    req: Request,
    payload: JwtPayload,
    done: DoneFunction,
  ): Promise<any> {
    try {
      const user = await this.usersService.findOne(payload.sub);
      
      if (!user) {
        return done(new UnauthorizedException('User not found'));
      }

      if (!user.isActive) {
        return done(new UnauthorizedException('User account is deactivated'));
      }

      return done(null, { 
        userId: payload.sub, 
        email: payload.email, 
        role: payload.role 
      });
    } catch (error) {
      return done(error);
    }
  }
}
