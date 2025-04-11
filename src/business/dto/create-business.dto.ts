import { IsString, Length } from 'class-validator';

export class CreateBusinessDto {
  @IsString()
  @Length(3, 20)
  name: string;
}
