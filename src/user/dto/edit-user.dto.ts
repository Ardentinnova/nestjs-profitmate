import { PartialType } from '@nestjs/swagger';
import { RegisterUserDto } from 'src/auth/dto/register-user.dto';

export class EditUserDto extends PartialType(RegisterUserDto) {}
