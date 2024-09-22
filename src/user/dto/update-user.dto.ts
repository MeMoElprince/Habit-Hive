import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsOptional, IsString } from "class-validator";

export class UpdateUserDto {
    @ApiProperty({ example: 'Mustafa Elsharawy', description: 'new name of the user', required: false })
    @IsString()
    @IsOptional()
    name: string;

    @ApiProperty({ example: 'memo@gmail.com', description: 'new email of the user', required: false })
    @IsEmail()
    @IsOptional()
    email: string;

    @ApiProperty({ example: 'I am a software engineer', description: 'new bio of the user', required: false })
    @IsString()
    @IsOptional()
    bio: string;

    @ApiProperty({ example: 'https://www.facebook.com', description: 'new facebook link of the user', required: false })
    @IsString()
    @IsOptional()
    facebookLink: string;

    @ApiProperty({ example: 'https://www.twitter.com', description: 'new twitter link of the user', required: false })
    @IsString()
    @IsOptional()
    twitterLink: string;    
}