import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { Role } from 'src/auth/enum/role.enum';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { UpdateUserDto } from './dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {


    constructor(
        private userService: UserService
    ) {}

    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles(Role.User)
    @ApiBearerAuth('default')
    @ApiOperation({ summary: 'Get my data', description: 'Get my profile' })
    @Get('me')
    getMe(@GetUser() user: User) {
        return user;
    }


    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth('default')
    @ApiOperation({ summary: 'Update my data', description: 'Each user update his profile' })
    @Patch('me')
    async updateMe(@GetUser('id') id: number, @Body() updateUserDto: UpdateUserDto) {
        return await this.userService.update(id, updateUserDto);
    }
}