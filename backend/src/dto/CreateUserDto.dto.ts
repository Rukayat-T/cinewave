import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @ApiProperty({ required: true, example: 'cat@dog.com' })
  email: string;

  @IsString()
  @ApiProperty({ required: true, example: 'xxxxx' })
  password: string;
}
