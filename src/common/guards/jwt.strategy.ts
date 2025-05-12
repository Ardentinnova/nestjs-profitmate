import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { SupabaseService } from 'src/common/supabase.service';
import { PrismaService } from '../prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private readonly supabaseService: SupabaseService,
    private readonly prisma: PrismaService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.SUPABASE_JWT_SECRET as string,
    });
  }

  async validate(payload: any) {
    const { sub } = payload;

    try {
      const user = await this.prisma.profile.findUnique({ where: { id: sub } });
      if (!user) {
        throw new UnauthorizedException('Invalid token or user not found');
      }
      return user;
    } catch (err) {
      console.error('JWT validation error:', err);
      throw new UnauthorizedException();
    }
  }
}
