import { PartialType } from '@nestjs/mapped-types';
import { IsBoolean, IsInt, IsOptional, IsString } from 'class-validator';
import { CreateHabitDto } from './create-habit.dto';

export class UpdateHabitDto extends PartialType(CreateHabitDto) {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsBoolean()
  is_public?: boolean;

  @IsOptional()
  @IsInt()
  category_id?: number;

  @IsOptional()
  @IsInt()
  repeat?: number;
}
