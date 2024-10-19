import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateHabitDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsBoolean()
  is_public: boolean;

  @IsOptional()
  @IsBoolean()
  is_targeted: boolean;

  @IsNotEmpty()
  @IsNumber()
  category_id: number;

  @IsOptional()
  @IsNumber()
  target: number;

  @IsOptional()
  @IsString()
  target_unit: string;

  @IsNotEmpty()
  @IsNumber()
  repeat: number;

  @IsOptional()
  @IsDate()
  end_date: Date;

  @IsOptional()
  @IsNumber()
  goal_id: number;
}
