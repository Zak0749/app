import supertest from 'supertest';
import faker from 'faker';
import app from '../app';
import { createQuiz } from '../helpers/createQuiz';

describe('INVALID', () => {
  test('request with bad category', async () => {
    const credentials = await createQuiz();
    const res = await credentials.request
      .get(`/api/category/${faker.lorem.word()}`);

    expect(res.status).toBe(400);
  });
});

describe('VALID', () => {
  test('request logged in', async () => {
    const credentials = await createQuiz();
    const res = await credentials.request
      .get(`/api/category/${credentials.full.categoryId}`);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      _id: credentials.full.categoryId.toHexString(),
      title: credentials.full.categoryTitle,
      quizzes: [{
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
      }],
    });
  });

  test('request logged out', async () => {
    const credentials = await createQuiz();
    const res = await supertest(app)
      .get(`/api/category/${credentials.full.categoryId}`);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      _id: credentials.full.categoryId.toHexString(),
      title: credentials.full.categoryTitle,
      quizzes: [{
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
      }],
    });
  });
});
