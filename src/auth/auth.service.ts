import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as argon2 from 'argon2';
import { LoginDto, SignupDto } from './dto';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private config: ConfigService,
    private jwt: JwtService,
  ) {}

  async login(data: LoginDto) {
    // find the user by email
    const user = await this.prismaService.user.findUnique({
      where: {
        email: data.email,
      },
    });
    // if the user is not found, return forbidden exception
    if (!user) {
      throw new ForbiddenException('Invalid credentials');
    }
    // verify the password
    const valid = await argon2.verify(user.hash, data.password);
    // if the password is invalid, return null
    if (!valid) {
      throw new ForbiddenException('Invalid credentials');
    }
    const access_token = await this.signToken(user.id, user.email);
    return { access_token };
  }

  async signup(data: SignupDto) {
    // hash the password
    const hash = await argon2.hash(data.password);
    delete data.password;
    // save the user to the database
    console.log('Working');
    const user = await this.prismaService.user.create({
      data: {
        ...data,
        hash,
      },
    });
    console.log('Working');
    const access_token = await this.signToken(user.id, user.email);
    return { access_token };
  }

  signToken(userId: number, email: string): Promise<string> {
    const payload = {
      sub: userId,
      email,
    };

    return this.jwt.signAsync(payload, {
      expiresIn: '30d',
      secret: this.config.get('JWT_SECRET'),
    });
  }
}
