import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

/*

    model Goal {
        id               Int       @id @default(autoincrement()) // Primary Key
        user_id          Int // Foreign Key (Assumes you have a User model)
        is_public        Boolean   @default(false) // Whether the goal is public
        target           Int? // Target value (e.g., number of repetitions)
        target_unit      String? // Unit for the target (e.g., "times", "hours")
        amount_completed Int? // amount_completed associated with this goal
        progress_percent String? // progress_percent tracking (optional)
        start_date       DateTime // Start date of the goal
        end_date         DateTime? // End date of the goal (optional)
        name             String // Goal name
        // ------------------------------------------------
  updated_at       DateTime  @updatedAt // Timestamp for when the record was last updated
  created_at       DateTime  @default(now()) // Timestamp for when the record was created

  // Relations
  user         User           @relation(fields: [user_id], references: [id])
  Badge        Badge[]
  Habits_Goals Habits_Goals[]

  @@map("goals") // Table name in the database
}
*/

export class CreateGoalDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'To run 5 miles a day',
    description: 'The goal name',
    required: true,
  })
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    example: 1,
    description: 'The user id',
    required: true,
  })
  user_id: number;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    example: false,
    description: 'Whether the goal is public or not',
    required: false,
    default: false,
  })
  is_public: boolean;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    example: 5,
    description: 'The target value, e.g., number of repetitions',
    required: false,
  })
  target: number;

  @IsOptional()
  @IsString()
  // @IsEnum()
  @ApiProperty({
    example: 'times',
    description:
      'The unit for the target, e.g., "times", "hours", "miles", etc.',
    required: false,
  })
  target_unit: string;

  @IsOptional()
  @IsNumber()
  @ApiProperty({
    example: 1,
    description: 'The amount completed',
    required: false,
  })
  amount_completed: number;

  // progress_percent

  @IsNotEmpty()
  @IsDate()
  @Type(() => Date)
  @ApiProperty({
    example: '2021-08-01T00:00:00.000Z',
    description: 'The start date of the goal',
    required: true,
  })
  start_date: Date;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  @ApiProperty({
    example: '2021-08-31T00:00:00.000Z',
    description: 'The end date of the goal',
    required: false,
  })
  end_date: Date;
}
