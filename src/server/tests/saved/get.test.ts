import supertest from 'supertest';
import app from '../../app';
import { createSaved } from '../../helpers/createSaved';

describe('INVALID', () => {
  test('request with bad session', async () => {
    await createSaved();
    const res = await supertest(app)
      .get('/api/saved');

    expect(res.status).toBe(401);
  });
});

describe('VALID', () => {
  test('request', async () => {
    const credentials = await createSaved();
    const res = await credentials.request
      .get('/api/saved')
      .send(credentials.use);

    expect(res.status).toBe(200);
    expect(res.body).toEqual([{
      date: expect.any(String),
      quiz: {
        _id: credentials.full.quizId.toString(),
        title: credentials.full.title,
        emoji: credentials.full.emoji,
        description: credentials.full.description,
        date: expect.any(String),
        featured: false,
        categoryTitle: credentials.full.categoryTitle,
        categoryId: credentials.full.categoryId.toString(),
        plays: expect.any(Number),
        questions: credentials.full.questions,
        userId: expect.any(String),
        username: credentials.full.username,
        owned: expect.any(Boolean),
        played: expect.any(Boolean),
        saved: expect.any(Boolean),
        progress: expect.any(Number),
      },
    }]);
  });
});
