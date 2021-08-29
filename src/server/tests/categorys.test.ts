import faker from 'faker';
import supertest from 'supertest';
import { CategoryCol } from '../..';
import app from '../app';
import db from '../db/get';

async function createCategorys() {
  const categorys = await db.categorys;
  const insert: CategoryCol[] = [{ title: faker.lorem.word() }];

  for (let index = 0; index < faker.datatype.number(10); index += 1) {
    insert.push({ title: faker.lorem.word() });
  }

  await categorys.insertMany(insert);

  return insert;
}

test('request', async () => {
  const categorys = await createCategorys();
  const res = await supertest(app)
    .get('/api/categorys');

  expect(res.status).toBe(200);
  expect(res.body).toEqual(categorys.map((val) => ({ ...val, _id: expect.any(String) })));
});
