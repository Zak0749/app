import supertest from 'supertest';
import app from '../app';
import { createQuiz } from '../helpers/createQuiz';
import { createSession } from '../helpers/createSession';

async function setup() {
  const user = await createSession();
  const notFinishedQuiz = await createQuiz();
  const finishedQuiz = await createQuiz();

  await user.request.post('/api/history').send({ ...user.use, quizId: notFinishedQuiz.full.quizId, progress: 0.5 });
  await user.request.post('/api/history').send({ ...user.use, quizId: finishedQuiz.full.quizId, progress: 1 });

  return {
    full: {
      ...user.full,
      notFinishedQuiz: notFinishedQuiz.full,
      finishedQuiz: finishedQuiz.full,
    },
    use: {
      ...user.use,
    },
    request: user.request,
  };
}

describe('INVALID', () => {
  test('request with bad session', async () => {
    await setup();
    const res = await supertest(app).get('/api/continue');

    expect(res.status).toBe(401);
  });
});

describe('VALID', () => {
  test('request', async () => {
    const credentials = await setup();
    const res = await credentials.request
      .get('/api/continue');

    expect(res.status).toBe(200);
    expect(res.body).toEqual([{
      date: expect.any(String),
      quiz: {
        _id: credentials.full.notFinishedQuiz.quizId.toString(),
        title: credentials.full.notFinishedQuiz.title,
        emoji: credentials.full.notFinishedQuiz.emoji,
        description: credentials.full.notFinishedQuiz.description,
        date: expect.any(String),
        featured: false,
        categoryTitle: credentials.full.notFinishedQuiz.categoryTitle,
        categoryId: credentials.full.notFinishedQuiz.categoryId.toString(),
        plays: expect.any(Number),
        questions: credentials.full.notFinishedQuiz.questions,
        userId: expect.any(String),
        username: credentials.full.notFinishedQuiz.username,
        owned: expect.any(Boolean),
        played: expect.any(Boolean),
        saved: expect.any(Boolean),
        progress: expect.any(Number),
      },
      progress: 0.5,
    }]);
  });
});
