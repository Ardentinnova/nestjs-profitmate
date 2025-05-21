import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { Profile } from 'generated/prisma';
import { User } from 'src/common/decorators/user.decorator';
import { JwtAuthGuard } from 'src/common/guards/jwt.guard';
import { ResponseUser } from './dto/response-user.dto';
import { EditUserDto } from './dto/edit-user.dto';
import { UserService } from './user.service';

@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200, type: ResponseUser })
  async getMe(@User() user: Profile) {
    return user;
  }

  @Patch()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({ status: 200, type: ResponseUser })
  async editUser(@User() user: Profile, @Body() editData: EditUserDto) {
    return this.userService.editUser(user.id, editData);
  }
}
