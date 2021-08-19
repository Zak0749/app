/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import faker from 'faker';
import supertest from 'supertest';
import app from '../app';

function userCredentials() {
  const firstname = faker.name.firstName();
  const secondname = faker.name.lastName();
  const credentials = {
    username: faker.internet.userName(firstname, secondname),
    email: faker.internet.email(firstname, secondname),
    password: faker.internet.password(),
    emoji: '😀',
  };

  return { full: credentials, use: credentials, request: supertest.agent(app) };
}
async function createUser() {
  const credentials = userCredentials();

  await credentials.request
    .post('/api/user')
    .send(credentials.use);

  return {
    full: {
      ...credentials.full,
      userEmoji: credentials.full.emoji,
    },
    use: {
      ...credentials.use,
      userEmoji: credentials.full.emoji,
    },
    request: credentials.request,
  };
}

export { userCredentials, createUser };
