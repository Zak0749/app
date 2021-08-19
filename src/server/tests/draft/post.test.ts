import supertest from 'supertest';
import faker from 'faker';
import db from '../../db/get';
import { quizCredentials } from '../../helpers/createQuiz';
import app from '../../app';

async function inDb(quiz: {[key:string]:unknown}) {
  const users = await db.users;
  const user = await users.findOne({
    drafts: { $elemMatch: { title: quiz.title } },
  });
  return !!user;
}

const keys = ['title', 'emoji', 'description', 'categoryId', 'questions'];

describe('INVALID', () => {
  keys.forEach((key) => {
    test(`request without ${key}`, async () => {
      const credentials = await quizCredentials();
      const copy: {[key:string]:unknown} = { ...credentials.use };
      copy[key] = undefined;
      const res = await credentials.request
        .post('/api/draft')
        .send(copy);

      expect(res.status).toBe(400);
      expect(await inDb(credentials.full)).toBe(false);
    });

    test(`request with wrong datatype for ${key}`, async () => {
      const credentials = await quizCredentials();
      const copy: {[key:string]:unknown} = { ...credentials.use };
      copy[key] = faker.datatype.array();
      const res = await credentials.request
        .post('/api/draft')
        .send(copy);

      expect(res.status).toBe(400);
      expect(await inDb(credentials.full)).toBe(false);
    });
  });

  test('request with bad session', async () => {
    const quiz = await quizCredentials();
    const res = await supertest(app)
      .post('/api/draft')
      .send({ ...quiz.use });

    expect(res.status).toBe(401);
    expect(await inDb(quiz.full)).toBe(false);
  });

  test('request with bad category', async () => {
    const quiz = await quizCredentials();
    const res = await quiz.request
      .post('/api/draft')
      .send({ ...quiz.use, categoryId: faker.datatype.string(24) });

    expect(res.status).toBe(400);
    expect(await inDb(quiz.full)).toBe(false);
  });
});

describe('VALID', () => {
  test('a valid request', async () => {
    const credentials = await quizCredentials();
    const res = await credentials.request
      .post('/api/draft')
      .send(credentials.use);

    expect(res.status).toBe(201);
    expect(await inDb(credentials.full)).toBe(true);
  });
});
