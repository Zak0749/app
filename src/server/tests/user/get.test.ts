import faker from 'faker';
import { ObjectId } from 'mongodb';
import supertest from 'supertest';
import app from '../../app';
import db from '../../db/get';
import { createQuiz } from '../../helpers/createQuiz';
import { createSession } from '../../helpers/createSession';

async function getWithUsername({ username }: anyObj) {
  const users = await db.users;
  const { _id } = await users.findOne({ username }) as { _id: ObjectId };
  return _id;
}

async function makeCredentials() {
  const credentials = await createQuiz();
  const userId = await getWithUsername(credentials.full);
  return {
    full: {
      ...credentials.full,
      userId,
    },
    use: {
      userId,
    },
    request: credentials.request,
  };
}

describe('INVALID', () => {
  test('request with bad user', async () => {
    const credentials = await makeCredentials();
    const res = await credentials.request
      .get(`/api/user/${faker.lorem.word()}`);

    expect(res.status).toBe(400);
  });
});

describe('VALID', () => {
  test('request logged in same user', async () => {
    const credentials = await makeCredentials();
    const res = await credentials.request
      .get(`/api/user/${credentials.full.userId}`);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      userId: credentials.full.userId.toHexString(),
      username: credentials.full.username,
      email: credentials.full.email,
      emoji: credentials.full.userEmoji,
      date: expect.any(String),
      owned: true,
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
        owned: true,
        played: false,
        saved: false,
        progress: 0,
      }],
    });
  });

  test('request logged in differnt user', async () => {
    const user = await makeCredentials();
    const credentials = await createSession();
    const res = await credentials.request
      .get(`/api/user/${user.full.userId}`);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      userId: user.full.userId.toHexString(),
      username: user.full.username,
      emoji: user.full.userEmoji,
      date: expect.any(String),
      owned: false,
      quizzes: [{
        _id: user.full.quizId.toString(),
        title: user.full.title,
        emoji: user.full.emoji,
        description: user.full.description,
        date: expect.any(String),
        featured: false,
        categoryTitle: user.full.categoryTitle,
        categoryId: user.full.categoryId.toString(),
        plays: expect.any(Number),
        questions: user.full.questions,
        userId: expect.any(String),
        username: user.full.username,
        owned: false,
        played: false,
        saved: false,
        progress: 0,
      }],
    });
  });

  test('test with no quizzes', async () => {
    const credentials = await createSession();
    const userId = await getWithUsername(credentials.full);
    const res = await credentials.request
      .get(`/api/user/${userId}`);

    expect(res.status).toBe(200);
  });

  test('request logged out', async () => {
    const user = await makeCredentials();
    const res = await supertest(app)
      .get(`/api/user/${user.full.userId}`);

    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      userId: user.full.userId.toHexString(),
      username: user.full.username,
      emoji: user.full.userEmoji,
      date: expect.any(String),
      owned: false,
      quizzes: [{
        _id: user.full.quizId.toString(),
        title: user.full.title,
        emoji: user.full.emoji,
        description: user.full.description,
        date: expect.any(String),
        featured: false,
        categoryTitle: user.full.categoryTitle,
        categoryId: user.full.categoryId.toString(),
        plays: expect.any(Number),
        questions: user.full.questions,
        userId: expect.any(String),
        username: user.full.username,
        owned: false,
        played: false,
        saved: false,
        progress: 0,
      }],
    });
  });
});
