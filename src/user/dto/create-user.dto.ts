import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'Id user', example: 'udin' })
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty({ description: 'Nama user', example: 'udin' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'Nama bisnis yang dijalankan user',
    example: 'Pukis enak dan lejat',
  })
  @IsNotEmpty()
  @IsString()
  businessName: string;

  @ApiProperty({ description: 'Email user', example: 'udin@gmail.com' })
  @IsNotEmpty()
  @IsString()
  email: string;
}
