import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { HabitsModule } from './habits/habits.module';
import { GoalsModule } from './goals/goals.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`,
      isGlobal: true,
    }),
    UserModule,
    HabitsModule,
    GoalsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
