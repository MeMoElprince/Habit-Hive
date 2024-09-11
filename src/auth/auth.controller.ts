import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, UserDto } from './dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(@Body() dto: AuthDto) {
        return this.authService.login(dto);
    }

    @Post('signup')
    async signup(@Body() dto: UserDto) {
        return this.authService.signup(dto);
    }

    
}
