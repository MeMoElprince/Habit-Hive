import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { HabitsService } from './habits.service';
import { CreateHabitDto } from './dto/create-habit.dto';
import { UpdateHabitDto } from './dto/update-habit.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Role } from 'src/auth/enum/role.enum';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { User } from '@prisma/client';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles(Role.User)
@ApiBearerAuth('default')
@Controller('habits')
export class HabitsController {
  constructor(private readonly habitsService: HabitsService) {}

  @ApiOperation({ description: 'Create a habit' })
  @Post()
  create(@Body() createHabitDto: CreateHabitDto, @GetUser() user: User) {
    return this.habitsService.create(createHabitDto, user);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateHabitDto: UpdateHabitDto,
    @GetUser() user: User,
  ) {
    return this.habitsService.update(+id, updateHabitDto, user);
  }

  @Get()
  findAll(@GetUser() user: User) {
    return this.habitsService.findAll(user);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @GetUser() user: User) {
    return this.habitsService.findOne(+id, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @GetUser() user: User) {
    return this.habitsService.remove(+id, user);
  }
}
