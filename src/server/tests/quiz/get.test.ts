import supertest from 'supertest';
import faker from 'faker';
import app from '../../app';
import { createQuiz } from '../../helpers/createQuiz';
import { createSession } from '../../helpers/createSession';
import { createSaved } from '../../helpers/createSaved';
import { createHistory } from '../../helpers/createHistory';

describe('INVALID', () => {
  test('request with a invalid quiz', async () => {
    const credentials = await createQuiz();
    const res = await credentials.request
      .get(`/api/quiz/${faker.lorem.word(24)}`);

    expect(res.status).toBe(400);
  });
});

describe('VALID', () => {
  test('request logged in with created user', async () => {
    const credentials = await createQuiz();
    const quiz = credentials.full;
    const res = await credentials.request
      .get(`/api/quiz/${credentials.full.quizId}`);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      _id: quiz.quizId.toString(),
      title: quiz.title,
      emoji: quiz.emoji,
      description: quiz.description,
      date: expect.any(String),
      featured: false,
      categoryTitle: quiz.categoryTitle,
      categoryId: quiz.categoryId.toString(),
      plays: expect.any(Number),
      questions: quiz.questions,
      userId: expect.any(String),
      username: quiz.username,
      owned: true,
      played: false,
      saved: false,
      progress: 0,
    });
  });

  test('request with played and logged in', async () => {
    const credentials = await createHistory();
    const quiz = credentials.full;
    const res = await credentials.request
      .get(`/api/quiz/${credentials.full.quizId}`);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      _id: quiz.quizId.toString(),
      title: quiz.title,
      emoji: quiz.emoji,
      description: quiz.description,
      date: expect.any(String),
      featured: false,
      categoryTitle: quiz.categoryTitle,
      categoryId: quiz.categoryId.toString(),
      plays: expect.any(Number),
      questions: quiz.questions,
      userId: expect.any(String),
      username: quiz.username,
      owned: true,
      played: true,
      saved: false,
      progress: quiz.progress,
    });
  });

  test('request with saved and logged in', async () => {
    const credentials = await createSaved();
    const quiz = credentials.full;
    const res = await credentials.request
      .get(`/api/quiz/${credentials.full.quizId}`);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      _id: quiz.quizId.toString(),
      title: quiz.title,
      emoji: quiz.emoji,
      description: quiz.description,
      date: expect.any(String),
      featured: false,
      categoryTitle: quiz.categoryTitle,
      categoryId: quiz.categoryId.toString(),
      plays: expect.any(Number),
      questions: quiz.questions,
      userId: expect.any(String),
      username: quiz.username,
      owned: true,
      played: false,
      saved: true,
      progress: 0,
    });
  });

  test('request logged in with other user', async () => {
    const credentials = await createQuiz();
    const quiz = credentials.full;
    const user = await createSession();
    const res = await user.request
      .get(`/api/quiz/${quiz.quizId}`);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      _id: quiz.quizId.toString(),
      title: quiz.title,
      emoji: quiz.emoji,
      description: quiz.description,
      date: expect.any(String),
      featured: false,
      categoryTitle: quiz.categoryTitle,
      categoryId: quiz.categoryId.toString(),
      plays: expect.any(Number),
      questions: quiz.questions,
      userId: expect.any(String),
      username: quiz.username,
      owned: false,
      played: false,
      saved: false,
      progress: 0,
    });
  });

  test('request logged out', async () => {
    const { full: quiz } = await createQuiz();
    const res = await supertest(app)
      .get(`/api/quiz/${quiz.quizId}`);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      _id: quiz.quizId.toString(),
      title: quiz.title,
      emoji: quiz.emoji,
      description: quiz.description,
      date: expect.any(String),
      featured: false,
      categoryTitle: quiz.categoryTitle,
      categoryId: quiz.categoryId.toString(),
      plays: expect.any(Number),
      questions: quiz.questions,
      userId: expect.any(String),
      username: quiz.username,
      owned: false,
      played: false,
      saved: false,
      progress: 0,
    });
  });
});
