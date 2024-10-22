import { OmitType } from '@nestjs/swagger';
import { CreateGoalDto } from './create-goal.dto';

export class CreateMyGoalDto extends OmitType(CreateGoalDto, ['user_id']) {}
