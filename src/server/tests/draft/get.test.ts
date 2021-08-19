import supertest from 'supertest';
import app from '../../app';
import createDraft from '../../helpers/createDraft';

describe('INVALID', () => {
  test('request with bad session', async () => {
    await createDraft();
    const res = await supertest(app)
      .get('/api/draft');

    expect(res.status).toBe(401);
  });
});

describe('VALID', () => {
  test('request with bad session', async () => {
    const credentials = await createDraft();
    const res = await credentials.request
      .get('/api/draft');

    expect(res.status).toBe(200);
    expect(res.body).toEqual([{
      _id: credentials.full.draftId.toHexString(),
      title: credentials.full.title,
      emoji: credentials.full.emoji,
      description: credentials.full.description,
      date: expect.any(String),
      categoryId: credentials.full.categoryId.toString(),
      questions: credentials.full.questions,
    }]);
  });
});
