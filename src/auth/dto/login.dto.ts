import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class Login {

    @ApiProperty({ example: 'memo@gmail.com' })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ example: 'memo' })
    @IsNotEmpty()
    @IsString()
    password: string;
}