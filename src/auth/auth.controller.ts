import { Body, Controller, Get, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Login, Signup } from './dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @HttpCode(HttpStatus.OK)
    @ApiOperation({ summary: 'Login', description: 'Login with email and password' })
    @Post('login')
    async login(@Body() loginDto: Login) {
        return this.authService.login(loginDto);
    }

    @ApiOperation({ summary: 'Signup', description: 'Signup: creating my new account' })
    @Post('signup')
    async signup(@Body() signupDto: Signup) {
        return this.authService.signup(signupDto);
    }
    
}
