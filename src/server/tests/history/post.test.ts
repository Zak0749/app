import { ObjectId } from 'mongodb';
import supertest from 'supertest';
import faker from 'faker';
import app from '../../app';
import db from '../../db/get';
import { historyCredentials } from '../../helpers/createHistory';
import { AnyObj } from '../../..';

async function inDb({ quizId }:AnyObj) {
  const users = await db.users;
  const user = await users.findOne({
    history: { $elemMatch: { quizId: new ObjectId(quizId as string) } },
  });
  return !!user;
}

const keys = ['quizId', 'progress'];

describe('INVALID', () => {
  keys.forEach((key) => {
    test(`request without ${key}`, async () => {
      const credentials = await historyCredentials();
      const copy: AnyObj = { ...credentials.use };
      copy[key] = undefined;
      const res = await credentials.request
        .post('/api/history')
        .send(copy);

      expect(res.status).toBe(400);
      expect(await inDb(credentials.full)).toBe(false);
    });

    test(`request with wrong datatype for ${key}`, async () => {
      const credentials = await historyCredentials();
      const copy: AnyObj = { ...credentials.use };
      copy[key] = faker.datatype.array();
      const res = await credentials.request
        .post('/api/history')
        .send(copy);

      expect(res.status).toBe(400);
      expect(await inDb(credentials.full)).toBe(false);
    });
  });

  test('request with bad session', async () => {
    const credentials = await historyCredentials();
    const res = await supertest(app)
      .post('/api/history')
      .send({ ...credentials.use });

    expect(res.status).toBe(401);
    expect(await inDb(credentials.full)).toBe(false);
  });

  test('request with bad quiz', async () => {
    const credentials = await historyCredentials();
    const res = await credentials.request
      .post('/api/history')
      .send({ ...credentials.use, quizId: faker.datatype.string(24) });

    expect(res.status).toBe(400);
    expect(await inDb(credentials.full)).toBe(false);
  });
});

describe('VALID', () => {
  test('request', async () => {
    const credentials = await historyCredentials();
    const res = await credentials.request
      .post('/api/history')
      .send(credentials.use);

    expect(res.status).toBe(201);
    expect(await inDb(credentials.full)).toBe(true);
  });
});
