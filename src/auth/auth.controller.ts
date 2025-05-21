import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Req,
  Res,
  HttpCode,
  HttpStatus,
  Get,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { Request, Response } from 'express';
import { ApiCreatedResponse, ApiResponse } from '@nestjs/swagger';
import { LoginResponse } from './dto/response-login.dto';
import { RefreshResponse } from './dto/response-refresh.dto';
import { Profile } from 'generated/prisma';
import { User } from 'src/common/decorators/user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  @Post('register')
  @HttpCode(HttpStatus.OK)
  @ApiCreatedResponse({
    description: 'akun telah dibuat',
  })
  async register(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.registerUser(registerUserDto);
  }

  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200, type: LoginResponse })
  async login(@Body() loginUserDto: LoginUserDto, @Res() res: Response) {
    const { user, refreshToken, accessToken } =
      await this.authService.loginUser(loginUserDto);

    if (loginUserDto.remember) {
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 1000 * 60 * 60 * 24 * 7,
      });
    }

    return res.status(200).json({
      statusCode: HttpStatus.OK,
      message: 'success',
      data: {
        accessToken,
        user,
      },
    });
  }

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200, type: RefreshResponse })
  async refresh(@Req() req: Request, @Res() res: Response) {
    const { accessToken, refreshToken } =
      await this.authService.refreshTokenUser(req);

    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return res.status(200).json({
      statusCode: HttpStatus.OK,
      message: 'success',
      data: {
        accessToken,
      },
    });
  }

  @Post('logout')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200 })
  async logout(@Res() res: Response) {
    return res.status(200).json(await this.authService.logout(res));
  }

  @Get('me')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200 })
  async getUserInfo(@User() user: Profile) {
    console.log(user);
    return user;
  }
}
