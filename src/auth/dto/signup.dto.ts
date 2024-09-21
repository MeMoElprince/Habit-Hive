import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

// user dto for signup
export class Signup {

    @ApiProperty({ example: 'Mustafa Elsharawy' })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ example: 'memo@gmail.com' })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ example: 'memo' })
    @IsNotEmpty()
    @IsString()
    password: string;

    @ApiProperty({ example: 'I am a software engineer', required: false })
    @IsOptional()
    @IsString()
    bio: string;

    @ApiProperty({ example: 'https://www.facebook.com', required: false })
    @IsOptional()
    @IsString()
    facebookLink: string;

    @ApiProperty({ example: 'https://www.twitter.com', required: false })
    @IsOptional()
    @IsString()
    twitterLink: string;
}