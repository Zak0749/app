import { ObjectId } from 'mongodb';
import supertest from 'supertest';
import { AnyObj } from '../../..';
import app from '../../app';
import db from '../../db/get';
import { createSaved } from '../../helpers/createSaved';

async function inDb({ quizId }:AnyObj) {
  const users = await db.users;
  const user = await users.findOne({
    saved: { $elemMatch: { quizId: new ObjectId(quizId as string) } },
  });
  return !!user;
}

describe('INVALID', () => {
  test('request with bad session', async () => {
    const credentials = await createSaved();

    const res = await supertest(app)
      .delete('/api/saved')
      .send(credentials.use);

    expect(res.status).toBe(401);
    expect(await inDb(credentials.use)).toBe(true);
  });

  test('request with bad quiz', async () => {
    const credentials = await createSaved();
    const res = await credentials.request
      .delete('/api/saved');

    expect(res.status).toBe(400);
    expect(await inDb(credentials.full)).toBe(true);
  });
});

describe('VALID', () => {
  test('a valid request', async () => {
    const credentials = await createSaved();

    const res = await credentials.request
      .delete('/api/saved')
      .send(credentials.use);

    expect(res.status).toBe(200);
    expect(await inDb(credentials.full)).toBe(false);
  });
});
