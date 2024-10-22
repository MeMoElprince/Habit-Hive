import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateGoalDto } from './dto/create-goal.dto';
import { UpdateGoalDto } from './dto/update-goal.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMyGoalDto } from './dto/create-my-goal.dto';
import { Goal } from '@prisma/client';

@Injectable()
export class GoalsService {
  constructor(private prismaService: PrismaService) {}
  // Base methods
  async create(createGoalDto: CreateGoalDto) {
    const newGoal = await this.prismaService.goal.create({
      data: createGoalDto,
    });
    return newGoal;
  }
  // NOTE will add filters here
  findAll() {
    const goals = this.prismaService.goal.findMany();
    return goals;
  }

  findOne(id: number) {
    const goal = this.prismaService.goal.findUnique({
      where: { id },
    });
    if (!goal) {
      throw new NotFoundException(`Goal with ID ${id} not found`);
    }
    return goal;
  }

  async update(id: number, updateGoalDto: UpdateGoalDto) {
    const updatedGoal = await this.prismaService.goal.update({
      where: { id },
      data: updateGoalDto,
    });
    return updatedGoal;
  }

  remove(id: number) {
    const deletedGoal = this.prismaService.goal.delete({
      where: { id },
    });
    return deletedGoal;
  }
  // ----------------------------
  createMyGoal(userId: number, createMyGoalDto: CreateMyGoalDto) {
    const data: CreateGoalDto = {
      ...createMyGoalDto,
      user_id: userId,
    };
    return this.create(data);
  }

  async updateMyGoal(
    userId: number,
    goalId: number,
    updateGoalDto: UpdateGoalDto,
  ) {
    const goal = await this.findOne(goalId);
    if (goal.user_id !== userId) {
      throw new ForbiddenException(`You don't have access to this goal`);
    }

    return this.update(goalId, updateGoalDto);
  }

  async deleteMyGoal(userId: number, goalId: number) {
    const goal = await this.findOne(goalId);
    if (goal.user_id !== userId) {
      throw new ForbiddenException(`You don't have access to this goal`);
    }

    return this.remove(goalId);
  }
  // NOTE will add filters here
  findAllMyGoals(userId: number) {
    return this.prismaService.goal.findMany({
      where: { user_id: userId },
    });
  }
  // NOTE will add filters here
  findAllPublicGoals() {
    return this.prismaService.goal.findMany({
      where: { is_public: true },
    });
  }
}
