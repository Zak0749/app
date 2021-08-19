import supertest from 'supertest';
import faker from 'faker';
import app from '../../app';
import db from '../../db/get';
import createDraft from '../../helpers/createDraft';
import { generateQuiz } from '../../helpers/createQuiz';

describe('INVALID', () => {
  test('request with bad session', async () => {
    const credentials = await createDraft();
    const res = await supertest(app)
      .patch('/api/draft')
      .send({ ...credentials.use });

    expect(res.status).toBe(401);
  });

  test('request with bad draft id', async () => {
    const credentials = await createDraft();
    const res = await credentials.request
      .patch('/api/draft')
      .send({ ...credentials.use, draftId: faker.datatype.string(24) });

    expect(res.status).toBe(400);
  });

  test('request with bad category', async () => {
    const credentials = await createDraft();
    const changes = await generateQuiz();

    const res = await credentials.request
      .patch('/api/draft')
      .send({
        ...credentials.use,
        ...changes,
        categoryTitle: undefined,
        categoryId: faker.datatype.string(24),
      });

    expect(res.status).toBe(400);
  });
});

describe('VALID', () => {
  test('request updates all properties', async () => {
    const credentials = await createDraft();
    const changes = await generateQuiz();
    const res = await credentials.request
      .patch('/api/draft')
      .send({
        ...credentials.use,
        ...changes,
        categoryTitle: undefined,
      });

    expect(res.status).toBe(200);
    const users = await db.users;
    const user = await users.findOne({ username: credentials.full.username }) as usercol;
    const draft = user.drafts[0];
    expect(draft).toEqual({
      _id: credentials.full.draftId,
      title: changes.title,
      emoji: changes.emoji,
      description: changes.description,
      date: expect.any(Date),
      categoryId: changes.categoryId,
      questions: changes.questions,
    });
  });

  test('updates one property', async () => {
    const credentials = await createDraft();
    const changes = await generateQuiz();
    const res = await credentials.request
      .patch('/api/draft')
      .send({
        ...credentials.use,
        title: changes.title,
      });

    expect(res.status).toBe(200);
    const users = await db.users;
    const user = await users.findOne({ username: credentials.full.username }) as usercol;
    const draft = user.drafts[0];
    expect(draft).toEqual({
      _id: credentials.full.draftId,
      title: changes.title,
      emoji: credentials.full.emoji,
      description: credentials.full.description,
      date: expect.any(Date),
      categoryId: credentials.full.categoryId,
      questions: credentials.full.questions,
    });
  });
});
