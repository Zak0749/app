import { ObjectId } from 'mongodb';
import supertest from 'supertest';
import faker from 'faker';
import app from '../../app';
import db from '../../db/get';
import { createQuiz } from '../../helpers/createQuiz';
import { AnyObj } from '../../..';

async function inDb({ quizId }:AnyObj) {
  const users = await db.users;
  const user = await users.findOne({
    saved: { $elemMatch: { quizId: new ObjectId(quizId as string) } },
  });
  return !!user;
}

describe('INVALID', () => {
  test('request with bad session', async () => {
    const credentials = await createQuiz();
    const res = await supertest(app)
      .post('/api/saved')
      .send(credentials.use);

    expect(res.status).toBe(401);
    expect(await inDb(credentials.full)).toBe(false);
  });

  test('request with bad quiz', async () => {
    const credentials = await createQuiz();
    const res = await credentials.request
      .post('/api/saved')
      .send({ ...credentials.use, quizId: faker.datatype.string(24) });

    expect(res.status).toBe(400);
    expect(await inDb(credentials.full)).toBe(false);
  });
});

describe('VALID', () => {
  test('request', async () => {
    const credentials = await createQuiz();
    const res = await credentials.request
      .post('/api/saved')
      .send(credentials.use);

    expect(res.status).toBe(201);
    expect(await inDb(credentials.full)).toBe(true);
  });
});
