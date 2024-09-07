import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon2 from 'argon2';
import { AuthDto, UserDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {

    constructor(
        private prismaService: PrismaService,
        private config: ConfigService,
        private jwt: JwtService
    ) {}

    async login(authDto: AuthDto) {
        // find the user by email
        const user = await this.prismaService.user.findUnique({
            where: {
                email: authDto.email
            }
        })
        // if the user is not found, return forbidden exception
        if (!user) {
            throw new ForbiddenException('Invalid credentials');
        }
        // verify the password
        const valid = await argon2.verify(user.hash, authDto.password);
        // if the password is invalid, return null
        if (!valid) {
            throw new ForbiddenException('Invalid credentials');
        }
        const access_token = await this.signToken(user.id, user.email);
        return {access_token};
    }
    
    async signup(userDto: UserDto) {
        try {
            // hash the password
            const hash = await argon2.hash(userDto.password);
            delete userDto.password;
            // save the user to the database
            const user = await this.prismaService.user.create({
                data: {
                    ...userDto,
                    hash
                }
            })


            const access_token = await this.signToken(user.id, user.email);
            return {access_token};
        } catch(err) {
            if(err instanceof PrismaClientKnownRequestError) {
                if(err.code === 'P2002') {
                    throw new ForbiddenException('Credentials already taken on ' + err.meta.target);
                }
            }
            throw err;
        }
    }


    signToken(userId: number, email: string): Promise<string> {
        const payload = {
            sub: userId,
            email
        }

        return this.jwt.signAsync(payload, {
            expiresIn: '16m',
            secret: this.config.get('JWT_SECRET')
        });
    }
}
