import { MongoClient } from 'mongodb';
import userSchema from './schemas/user/user';
import fullQuizSchema from './schemas/quiz/quiz';

async function setup(conn: MongoClient): Promise<void> {
  const collections = await conn.db('quizDb').collections();
  if (!collections.some((e) => e.collectionName === 'Users')) {
    await conn.db('quizDb').createCollection('Users', userSchema);
    await conn.db('quizDb').collection('Users').createIndex({ username: 1 }, { unique: true });
    await conn.db('quizDb').collection('Users').createIndex({ email: 1 }, { unique: true });
    await conn.db('quizDb').collection('Users').createIndex({ username: 'text' });
  }

  if (!collections.some((e) => e.collectionName === 'Quizzes')) {
    await conn.db('quizDb').createCollection('Quizzes', fullQuizSchema);
    await conn.db('quizDb').collection('Quizzes').createIndex({ title: 'text', description: 'text' });
  }
}

export default setup;
