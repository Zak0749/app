import supertest from 'supertest';
import { ObjectId } from 'mongodb';
import faker from 'faker';
import app from '../../app';
import db from '../../db/get';
import { createQuiz } from '../../helpers/createQuiz';
import { createSession } from '../../helpers/createSession';

async function inDb({ quizId }: anyObj) {
  const quizzes = await db.quizzes;
  const quiz = await quizzes.findOne({ _id: new ObjectId(quizId as string) });
  return !!quiz;
}

const keys = ['quizId'];

describe('INVALID', () => {
  keys.forEach((key) => {
    test(`request without ${key}`, async () => {
      const credentials = await createQuiz();
      const copy: anyObj = { ...credentials.use };
      copy[key] = undefined;
      const res = await credentials.request
        .delete('/api/quiz')
        .send(copy);

      expect(res.status).toBe(400);
      expect(await inDb(credentials.full)).toBe(true);
    });

    test(`request with wrong type for ${key}`, async () => {
      const credentials = await createQuiz();
      const copy: anyObj = { ...credentials.use };
      copy[key] = faker.datatype.array();
      const res = await credentials.request
        .delete('/api/quiz')
        .send(copy);

      expect(res.status).toBe(400);
      expect(await inDb(credentials.full)).toBe(true);
    });
  });

  test('request with bad session', async () => {
    const credentials = await createQuiz();
    const res = await supertest(app)
      .delete('/api/quiz')
      .send({ ...credentials.use });

    expect(res.status).toBe(401);
    expect(await inDb(credentials.full)).toBe(true);
  });

  test('request with bad quiz', async () => {
    const credentials = await createQuiz();
    const res = await credentials.request
      .delete('/api/quiz')
      .send({ quizId: faker.datatype.string(24) });

    expect(res.status).toBe(400);
    expect(await inDb(credentials.full)).toBe(true);
  });

  test('request with wrong account', async () => {
    const credentials = await createQuiz();
    const user = await createSession();
    const res = await user.request
      .delete('/api/quiz')
      .send({ quizId: credentials.full.quizId });

    expect(res.status).toBe(400);
    expect(await inDb(credentials.full)).toBe(true);
  });
});

describe('VALID', () => {
  test('request', async () => {
    const credentials = await createQuiz();
    const res = await credentials.request
      .delete('/api/quiz')
      .send(credentials.use);

    expect(res.status).toBe(200);
    expect(await inDb(credentials.full)).toBe(false);
  });
});
