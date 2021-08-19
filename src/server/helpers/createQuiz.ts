import faker from 'faker';
import { ObjectId } from 'mongodb';
import { createSession } from './createSession';
import db from '../db/get';

function generateQuestions() {
  const questions = [];
  for (let index = 0; index < faker.datatype.number(10); index += 1) {
    questions.push({
      body: faker.lorem.sentence(),
      answers: [
        {
          body: faker.lorem.words(2),
          correct: faker.datatype.boolean(),
        }, {
          body: faker.lorem.words(2),
          correct: faker.datatype.boolean(),
        },
      ],
    });
  }

  return questions;
}

async function generateQuiz() {
  const categorys = await db.categorys;
  const categoryTitle = faker.lorem.word();
  const category = await categorys.insertOne({ title: categoryTitle });

  const quiz = {
    title: faker.lorem.words(2),
    emoji: faker.datatype.string(1),
    description: faker.lorem.paragraph(),
    categoryId: category.insertedId,
    categoryTitle,
    questions: generateQuestions(),
  };

  return quiz;
}

async function quizCredentials() {
  const credentials = await createSession();
  const quiz = await generateQuiz();

  return {
    full: {
      ...credentials.full,
      ...quiz,
    },
    use: {
      ...quiz,
    },
    request: credentials.request,
  };
}

async function createQuiz() {
  const quizzes = await db.quizzes;
  const credentials = await quizCredentials();
  await credentials.request
    .post('/api/quiz')
    .send(credentials.use);

  const { _id } = await quizzes.findOne({ title: credentials.full.title }) as { _id: ObjectId};

  return {
    full: {
      ...credentials.full,
      quizId: _id,
    },
    use: {
      quizId: _id,
    },
    request: credentials.request,
  };
}

export { quizCredentials, createQuiz, generateQuiz };
