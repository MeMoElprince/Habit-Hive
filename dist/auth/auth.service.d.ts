import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto, UserDto } from './dto';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private prismaService;
    private config;
    private jwt;
    constructor(prismaService: PrismaService, config: ConfigService, jwt: JwtService);
    login(authDto: AuthDto): Promise<{
        access_token: string;
    }>;
    signup(userDto: UserDto): Promise<{
        access_token: string;
    }>;
    signToken(userId: number, email: string): Promise<string>;
}
