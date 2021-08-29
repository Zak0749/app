import faker from 'faker';
import supertest from 'supertest';
import { AnyObj } from '../../..';
import app from '../../app';
import db from '../../db/get';
import { userCredentials } from '../../helpers/createUser';

async function inDb(sent: AnyObj) {
  const users = await db.users;
  const user = await users.findOne({ username: sent.username, email: sent.email });
  return !!user;
}

const keys = ['username', 'email', 'password', 'emoji'];

describe('INVALID', () => {
  keys.forEach((key) => {
    test(`request without ${key}`, async () => {
      const user = userCredentials().use;
      const copy:AnyObj = { ...user };
      copy[key] = undefined;
      const res = await supertest(app)
        .post('/api/user')
        .send(copy);

      expect(res.status).toBe(400);

      expect(await inDb(user)).toBe(false);
    });

    test(`request with wrong datatype for ${key}`, async () => {
      const user = userCredentials().use;
      const copy:AnyObj = { ...user };
      copy[key] = faker.datatype.array();
      const res = await supertest(app)
        .post('/api/user')
        .send(copy);

      expect(res.status).toBe(400);
      expect(await inDb(user)).toBe(false);
    });
  });
});

describe('VALID', () => {
  test('request', async () => {
    const user = userCredentials().use;
    const res = await supertest(app)
      .post('/api/user')
      .send(user);

    expect(res.status).toBe(201);
    expect(await inDb(user)).toBe(true);
  });
});
