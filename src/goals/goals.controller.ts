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
import { GoalsService } from './goals.service';
import { CreateGoalDto } from './dto/create-goal.dto';
import { UpdateGoalDto } from './dto/update-goal.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/auth/decorator/roles.decorator';
import { Role } from 'src/auth/enum/role.enum';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { GetUser } from 'src/auth/decorator';

@ApiTags('Goal')
@Controller('goals')
export class GoalsController {
  constructor(private readonly goalsService: GoalsService) {}
  /*
    1- user creates his goals done
    2- user can see his goals done
    3- user can update his goals done
    4- user can delete his goals done
    5- admin can see all goals done
    6- user can see other public goals  done
  */

  // user creates his goals
  @Post('me')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.User, Role.Admin)
  @ApiBearerAuth('default')
  @ApiOperation({
    summary: 'Create goal',
    description: 'this route used to Create goal for the current user',
  })
  create(@GetUser('id') userId: number, @Body() createGoalDto: CreateGoalDto) {
    return this.goalsService.createMyGoal(userId, createGoalDto);
  }

  // Admin find all goals
  @Get()
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth('default')
  @ApiOperation({
    summary: 'Get all goals',
    description: 'this route used to get all goals for admin',
  })
  findAll() {
    return this.goalsService.findAll();
  }

  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('default')
  @ApiOperation({
    summary: 'Get all my goals',
    description:
      'this route used to get all user (current user) goals (for any user)',
  })
  findAllMyGoals(@GetUser('id') userId: number) {
    return this.goalsService.findAllMyGoals(userId);
  }

  @Get('public')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('default')
  @ApiOperation({
    summary: 'Get all public goals',
    description: 'this route used to get all public goals (for any user)',
  })
  findAllPublicGoals() {
    return this.goalsService.findAllPublicGoals();
  }
  // get goal by id
  @Get(':id')
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  @Roles(Role.Admin)
  @ApiBearerAuth('default')
  @ApiOperation({
    summary: 'Get goal by id',
    description: 'this route used to get goal by id (for admin)',
  })
  findOne(@Param('id') id: number) {
    return this.goalsService.findOne(+id);
  }

  @Patch(':id/me')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('default')
  @ApiOperation({
    summary: 'Update my goal',
    description:
      'this route used to update goal for the current user (for any user)',
  })
  update(
    @GetUser('id') userId: number,
    @Param('id') id: number,
    @Body() updateGoalDto: UpdateGoalDto,
  ) {
    return this.goalsService.updateMyGoal(userId, +id, updateGoalDto);
  }

  @Delete(':id/me')
  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('default')
  @ApiOperation({
    summary: 'Delete my goal',
    description:
      'this route used to delete goal for the current user (for any user)',
  })
  remove(@GetUser('id') userId: number, @Param('id') id: number) {
    return this.goalsService.deleteMyGoal(userId, +id);
  }
}
