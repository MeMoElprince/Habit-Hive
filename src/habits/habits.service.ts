import { Injectable } from '@nestjs/common';
import { CreateHabitDto } from './dto/create-habit.dto';
import { UpdateHabitDto } from './dto/update-habit.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class HabitsService {
  constructor(private prismaService: PrismaService) {}

  private Habit = this.prismaService.habit;
  private Goal = this.prismaService.habits_Goals;

  async create(createHabitDto: CreateHabitDto, user: User) {
    const { category_id, goal_id, ...habitData } = createHabitDto;

    const data = await this.Habit.create({
      data: {
        ...habitData,
        start_date: new Date(),
        updated_at: new Date(),
        user: { connect: { id: user.id } },
        category: { connect: { id: category_id } },
      },
    });

    if (goal_id) {
      await this.Goal.create({
        data: {
          user: { connect: { id: user.id } },
          goal: { connect: { id: goal_id } },
          habit: { connect: { id: data.id } },
        },
      });
    }

    return data;
  }

  async update(id: number, updateHabitDto: UpdateHabitDto, user: User) {
    const { category_id, ...habitData } = updateHabitDto;

    const data = await this.Habit.update({
      where: { id, user_id: user.id },
      data: {
        ...habitData,
        start_date: new Date(),
        updated_at: new Date(),
        ...(category_id ? { category: { connect: { id: category_id } } } : {}),
      },
    });

    return data;
  }

  async findAll(user: User) {
    const data = await this.Habit.findMany({ where: { user_id: user.id } });
    return data;
  }

  async findOne(id: number, user: User) {
    const data = await this.Habit.findMany({ where: { id, user_id: user.id } });
    return data;
  }

  async remove(id: number, user: User) {
    const data = await this.Habit.delete({ where: { id, user_id: user.id } });
    return data;
  }
}
