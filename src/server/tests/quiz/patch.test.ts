import supertest from 'supertest';
import faker from 'faker';
import { ObjectId } from 'mongodb';
import app from '../../app';
import db from '../../db/get';
import { createQuiz, generateQuiz } from '../../helpers/createQuiz';

describe('INVALID', () => {
  test('request with bad session', async () => {
    const credentials = await createQuiz();
    const res = await supertest(app)
      .patch('/api/quiz')
      .send({ ...credentials.use, token: faker.datatype.string(24) });

    expect(res.status).toBe(401);
  });

  test('request with bad quiz', async () => {
    const credentials = await createQuiz();
    const res = await credentials.request
      .patch('/api/quiz')
      .send({ ...credentials.use, quizId: faker.datatype.string(24) });

    expect(res.status).toBe(400);
  });

  test('request with bad category', async () => {
    const credentials = await createQuiz();
    const changes = await generateQuiz();

    const res = await credentials.request
      .patch('/api/quiz')
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
  test('a valid request', async () => {
    const credentials = await createQuiz();
    const changes = await generateQuiz();

    const res = await credentials.request
      .patch('/api/quiz')
      .send({
        ...credentials.use,
        ...changes,
        categoryTitle: undefined,
      });

    expect(res.status).toBe(200);

    const quizzes = await db.quizzes;
    const quiz = await quizzes.findOne({ _id: credentials.full.quizId });
    expect(quiz).toEqual({
      _id: credentials.full.quizId,
      title: changes.title,
      emoji: changes.emoji,
      description: changes.description,
      date: expect.any(Date),
      featured: false,
      categoryId: changes.categoryId,
      plays: expect.any(Number),
      questions: changes.questions,
      userId: expect.any(ObjectId),
    });
  });

  test('a valid request with not fully changed', async () => {
    const credentials = await createQuiz();
    const changes = await generateQuiz();

    const res = await credentials.request
      .patch('/api/quiz')
      .send({
        ...credentials.use,
        title: changes.title,
      });

    expect(res.status).toBe(200);

    const quizzes = await db.quizzes;
    const quiz = await quizzes.findOne({ _id: credentials.full.quizId });
    expect(quiz).toEqual({
      _id: credentials.full.quizId,
      title: changes.title,
      emoji: credentials.full.emoji,
      description: credentials.full.description,
      date: expect.any(Date),
      featured: false,
      categoryId: credentials.full.categoryId,
      plays: expect.any(Number),
      questions: credentials.full.questions,
      userId: expect.any(ObjectId),
    });
  });
});
