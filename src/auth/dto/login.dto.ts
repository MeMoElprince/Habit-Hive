import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    example: 'memo@gmail.com',
    description: 'Email',
    required: true,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'memo', description: 'Password', required: true })
  @IsNotEmpty()
  @IsString()
  password: string;
}
