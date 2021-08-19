import { createUser } from './createUser';

async function sessionCredentials() {
  const credentials = await createUser();
  return {
    full: {
      ...credentials.full,
    },
    use: {
      username: credentials.full.username,
      password: credentials.full.password,
    },
    request: credentials.request,
  };
}

async function createSession() {
  const credentials = await sessionCredentials();

  await credentials.request
    .post('/api/session')
    .send(credentials.use);

  return {
    use: {},
    full: {
      ...credentials.full,
    },
    request: credentials.request,
  };
}

export { sessionCredentials, createSession };
