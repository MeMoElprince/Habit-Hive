import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsOptional, IsString } from "class-validator";

// user dto for signup
export class SignupDto {
    @ApiProperty({ example: 'Mustafa Elsharawy', description: 'Name of the user', required: true })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ example: 'memo@gmail.com', description: 'Email of the user', required: true })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ example: 'memo', description: 'Password', required: true })
    @IsNotEmpty()
    @IsString()
    password: string;

    @ApiProperty({ example: 'I am a software engineer', required: false, description: 'Bio' })
    @IsOptional()
    @IsString()
    bio: string;

    @ApiProperty({ example: 'https://www.facebook.com', required: false, description: 'Facebook link' })
    @IsOptional()
    @IsString()
    facebookLink: string;

    @ApiProperty({ example: 'https://www.twitter.com', required: false, description: 'Twitter link' })
    @IsOptional()
    @IsString()
    twitterLink: string;
}