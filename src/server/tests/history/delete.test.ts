import { ObjectId } from 'mongodb';
import supertest from 'supertest';
import faker from 'faker';
import app from '../../app';
import db from '../../db/get';
import { createHistory } from '../../helpers/createHistory';

async function inDb({ quizId }:{ [key: string]: unknown }) {
  const users = await db.users;
  const user = await users.findOne({
    history: { $elemMatch: { quizId: new ObjectId(quizId as string) } },
  });
  return !!user;
}

describe('INVALID', () => {
  test('request with bad session', async () => {
    const credentials = await createHistory();
    const res = await supertest(app)
      .delete('/api/history')
      .send({ ...credentials.use, deviceId: faker.datatype.string(20) });

    expect(res.status).toBe(401);
    expect(await inDb(credentials.full)).toBe(true);
  });

  test('request with bad quiz', async () => {
    const credentials = await createHistory();
    const res = await credentials.request
      .delete('/api/history')
      .send({ ...credentials.use, quizId: faker.datatype.string(24) });

    expect(res.status).toBe(400);
    expect(await inDb(credentials.full)).toBe(true);
  });
});

describe('VALID', () => {
  test('a valid request', async () => {
    const credentials = await createHistory();

    const res = await credentials.request
      .delete('/api/history')
      .send(credentials.use);

    expect(res.status).toBe(200);
    expect(await inDb(credentials.full)).toBe(false);
  });
});
