import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { SupabaseService } from './supabase.service';
import { JwtAuthGuard } from './guards/jwt.guard';
import { JwtStrategy } from './guards/jwt.strategy';

@Global()
@Module({
  providers: [PrismaService, SupabaseService, JwtAuthGuard, JwtStrategy],
  exports: [PrismaService, SupabaseService, JwtAuthGuard, JwtStrategy],
})
export class CommonModule {}
