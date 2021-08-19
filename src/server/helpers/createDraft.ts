import { ObjectId } from 'mongodb';
import '';
import db from '../db/get';
import { quizCredentials } from './createQuiz';

async function createDraft() {
  const users = await db.users;
  const credentials = await quizCredentials();
  await credentials.request
    .post('/api/draft')
    .send(credentials.use);

  const user = await users.findOne({ username: credentials.full.username }) as usercol;
  const draftId = user.drafts[0]._id as ObjectId;

  return {
    full: {
      ...credentials.full,
      draftId,
    },
    use: {
      draftId,
    },
    request: credentials.request,
  };
}

export default createDraft;
