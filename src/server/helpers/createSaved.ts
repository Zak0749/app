import { createQuiz } from './createQuiz';

async function createSaved() {
  const credentials = await createQuiz();

  await credentials.request
    .post('/api/saved')
    .send(credentials.use);

  return credentials;
}

export { createQuiz as savedCredetials, createSaved };
