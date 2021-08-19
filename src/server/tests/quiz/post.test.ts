import faker from 'faker';
import supertest from 'supertest';
import app from '../../app';
import db from '../../db/get';
import { quizCredentials } from '../../helpers/createQuiz';

async function inDb({ title }: any) {
  const quizzes = await db.quizzes;
  const quiz = await quizzes.findOne({ title });
  return !!quiz;
}

const keys = ['title', 'emoji', 'description', 'categoryId', 'questions'];

describe('INVALID', () => {
  keys.forEach((key) => {
    test(`request without ${key}`, async () => {
      const credentials = await quizCredentials();
      const copy: any = { ...credentials.use };
      copy[key] = undefined;
      const res = await credentials.request
        .post('/api/quiz')
        .send(copy);

      expect(res.status).toBe(400);
      expect(await inDb(credentials.full)).toBe(false);
    });

    test(`request with wrong datatype for ${key}`, async () => {
      const credentials = await quizCredentials();
      const copy: any = { ...credentials.use };
      copy[key] = faker.datatype.array();
      const res = await credentials.request
        .post('/api/quiz')
        .send(copy);

      expect(res.status).toBe(400);
      expect(await inDb(credentials.full)).toBe(false);
    });
  });

  test('request with bad session', async () => {
    const credentials = await quizCredentials();
    const res = await supertest(app)
      .post('/api/quiz')
      .send({ ...credentials.use, deviceId: faker.datatype.string(20) });

    expect(res.status).toBe(401);
    expect(await inDb(credentials.full)).toBe(false);
  });

  test('request with bad category', async () => {
    const credentials = await quizCredentials();
    const res = await credentials.request
      .post('/api/quiz')
      .send({ ...credentials.use, categoryId: faker.datatype.string(24) });

    expect(res.status).toBe(400);
    expect(await inDb(credentials.full)).toBe(false);
  });
});

describe('VALID', () => {
  test('a valid request', async () => {
    const credentials = await quizCredentials();
    const res = await credentials.request
      .post('/api/quiz')
      .send(credentials.use);

    expect(res.status).toBe(201);
    expect(await inDb(credentials.full)).toBe(true);
  });
});
