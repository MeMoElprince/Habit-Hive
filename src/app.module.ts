import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';

@Module({
  imports: [
                          PrismaModule,
                          AuthModule,
                          ConfigModule.forRoot({ isGlobal: true }),
                          UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
