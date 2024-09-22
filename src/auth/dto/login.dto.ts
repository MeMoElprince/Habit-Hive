import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class Login {

    @ApiProperty({ example: 'memo@gmail.com', description: 'Email', required: true })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ example: 'memo', description: 'Password', required: true })
    @IsNotEmpty()
    @IsString()
    password: string;
}