import supertest from 'supertest';
import faker from 'faker';
import app from '../../app';
import db from '../../db/get';
import createDraft from '../../helpers/createDraft';

async function inDb(quiz: {[key:string]:unknown}) {
  const users = await db.users;
  const user = await users.findOne({
    drafts: { $elemMatch: { title: quiz.title } },
  });
  return !!user;
}

describe('INVALID', () => {
  test('request with bad user', async () => {
    const credentials = await createDraft();
    const res = await supertest(app)
      .delete('/api/draft')
      .send({ draftId: credentials.full.draftId });

    expect(res.status).toBe(401);
    expect(await inDb(credentials.full)).toBe(true);
  });

  test('request with bad draft', async () => {
    const credentials = await createDraft();
    const res = await credentials.request
      .delete('/api/draft')
      .send({ ...credentials.use, draftId: faker.datatype.string(24) });

    expect(res.status).toBe(400);
    expect(await inDb(credentials.full)).toBe(true);
  });
});

describe('VALID', () => {
  test('request', async () => {
    const credentials = await createDraft();
    const res = await credentials.request
      .delete('/api/draft')
      .send(credentials.use);

    expect(res.status).toBe(200);
    expect(await inDb(credentials.full)).toBe(false);
  });
});
