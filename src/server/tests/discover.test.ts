import supertest from 'supertest';
import app from '../app';
import { createQuiz } from '../helpers/createQuiz';

describe('VALID', () => {
  test('request logged in', async () => {
    const credentials = await createQuiz();
    const res = await credentials.request
      .get('/api/discover');

    expect(res.status).toBe(200);
  });

  test('request logged out', async () => {
    const res = await supertest(app)
      .get('/api/discover');

    expect(res.status).toBe(200);
  });
});
