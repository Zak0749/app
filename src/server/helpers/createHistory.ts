import faker from 'faker';
import { createQuiz } from './createQuiz';

async function historyCredentials() {
  const credentials = await createQuiz();
  const progress = faker.datatype.boolean() ? 1 : 0.5;
  return {
    full: {
      ...credentials.full,
      progress,
    },
    use: {
      ...credentials.use,
      progress,
    },
    request: credentials.request,
  };
}

async function createHistory() {
  const credentials = await historyCredentials();

  await credentials.request
    .post('/api/history')
    .send(credentials.use);

  return {
    full: {
      ...credentials.full,
    },
    use: {
      quizId: credentials.full.quizId,
    },
    request: credentials.request,
  };
}

export { historyCredentials, createHistory };
