import faker from 'faker';
import supertest from 'supertest';
import db from '../../db/get';
import app from '../../app';
import { createSession } from '../../helpers/createSession';

async function inDb(sent: anyObj) {
  const users = await db.users;
  const user = await users.findOne({ username: sent.username, email: sent.email });
  return !!user;
}

describe('INVALID', () => {
  test('request with bad session', async () => {
    const user = await createSession();
    const res = await supertest(app)
      .delete('/api/user')
      .send({ username: user.full.username, password: user.full.password });

    expect(res.status).toBe(401);
  });

  test('with wrong password', async () => {
    const user = await createSession();
    const res = await user.request
      .delete('/api/user')
      .send({ username: user.full.username, password: faker.internet.password() });

    expect(res.status).toBe(400);

    expect(await inDb(user.full)).toBe(true);
  });
});

describe('VALID', () => {
  test('request', async () => {
    const user = await createSession();
    const res = await user.request
      .delete('/api/user')
      .send({ username: user.full.username, password: user.full.password });

    expect(res.status).toBe(200);
    expect(await inDb(user.full)).toBe(false);
  });
});
