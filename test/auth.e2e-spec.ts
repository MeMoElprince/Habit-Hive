import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';

describe('AUth Controller (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [PrismaService],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // Inject PrismaService
    prisma = app.get<PrismaService>(PrismaService);

    // Clean up the database before running tests
    await prisma.user.deleteMany();
  });

  it('(POST) Sign Up', () => {
    return request(app.getHttpServer())
      .post('/auth/signup')
      .send({
        name: 'Mustafa Elsharawy',
        email: 'memo@gmail.com',
        password: 'memo',
        bio: 'I am a software engineer',
        facebookLink: 'https://www.facebook.com',
        twitterLink: 'https://www.twitter.com',
      })
      .expect(201);
  });
});
