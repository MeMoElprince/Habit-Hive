import { Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { Role } from 'src/auth/enum/role.enum';
import { RolesGuard } from 'src/auth/guard/roles.guard';

@Controller('users')
export class UserController {
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(Role.User)
    @ApiBearerAuth('default')
    @ApiOperation({ summary: 'Get my data', description: 'Get my profile' })
    @Get('me')
    getMe(@GetUser() user: User) {
        return user;
    }
}