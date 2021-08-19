import supertest from 'supertest';
import faker from 'faker';
import app from '../app';
import { createQuiz } from '../helpers/createQuiz';
import { createSession } from '../helpers/createSession';

beforeAll(async () => {
  const promises = [];
  for (let i = 0; i < 10; i += 1) {
    promises.push(createQuiz());
    promises.push(createQuiz());
  }
  await Promise.all(promises);
});

describe('VALID', () => {
  test('a request logged in', async () => {
    const session = await createSession();
    const res = await session.request
      .get(`/api/search/${faker.lorem.word()}`);

    expect(res.status).toBe(200);
  });

  test('a request logged out', async () => {
    const res = await supertest(app)
      .get(`/api/search/${faker.lorem.word()}`);

    expect(res.status).toBe(200);
  });
});
