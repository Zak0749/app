/* eslint-disable */
import { ObjectId } from 'mongodb';
import { createQuiz, quizCredentials } from '../helpers/createQuiz';
import db from './get';

async function testData(): Promise<void> {
  for (let i = 0; i < 100; i += 1) {
    try {
      createQuiz();
      console.log(`quiz#${i}`);
    } catch (error:any) {
      console.error(error);
    }
  }

  console.log('done');
}

testData();
