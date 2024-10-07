import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';
import { PrismaExceptionFilter } from '../src/exception-filters/prisma.exception';

describe('AUth Controller (e2e)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [PrismaService],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalFilters(new PrismaExceptionFilter());
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

  it('(POST) Sign Up with duplicate email', () => {
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
      .expect(400)
      .then((res) => {
        expect(res.body.message).toEqual('Credentials already taken on email');
      });
  });

  it('(POST) Log In', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'memo@gmail.com',
        password: 'memo',
      })
      .expect(200)
      .then((res) => {
        expect(res.body.access_token).toBeDefined();
      });
  });

  it('(POST) Log In with wrong password', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({
        email: 'memo@gmail.com',
        password: 'wrong_password',
      })
      .expect(403)
      .then((res) => {
        expect(res.body.message).toEqual('Invalid credentials');
      });
  });
});
