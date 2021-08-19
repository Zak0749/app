import express from 'express';
import { ObjectId } from 'mongodb';
import { quizType } from '../../../@types/types';
import db from '../../../db/get';
import { formQuiz } from '../../../helpers/form-quiz';

const router = express.Router();

router.get('/api/quiz/:id', async (req, res, next) => {
  try {
    const quizzes = await db.quizzes;
    const quiz = await quizzes.findOne({ _id: new ObjectId(req.params.id) }) as quizType;

    res.status(200).json(await formQuiz(quiz, req.currentUser));
  } catch (err) {
    if (err.message === 'Argument passed in must be a Buffer or string of 12 bytes or a string of 24 hex characters'
        || err.message === 'quiz is null'
        || err.message === "Cannot read property 'toString' of undefined") {
      res.sendStatus(400);
      return;
    }
    next(err);
  }
});

export default router;
