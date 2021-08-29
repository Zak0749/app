import { Router } from 'express';
import { ObjectId } from 'mongodb';
import { AnyObj, CategoryCol, QuizCol } from '../../..';
import db from '../../db/get';

const router = Router();

router.patch('/api/quiz', async (req, res, next) => {
  try {
    if (!req.currentUser) { res.sendStatus(401); return; }

    const quizzes = await db.quizzes;
    const categorys = await db.categorys;

    const session = req.currentUser;
    const quiz = await quizzes.findOne({ _id: new ObjectId(req.body.quizId) }) as QuizCol;

    if (!quiz) {
      res.sendStatus(400);
      return;
    }

    if (session._id.toHexString() !== quiz.userId.toString()) {
      res.sendStatus(400);
      return;
    }

    if (req.body.categoryId) {
      const category = await categorys.findOne({ _id: new ObjectId(req.body.categoryId) }) as CategoryCol;

      if (!category) {
        res.sendStatus(400);
        return;
      }
    }

    const updates: AnyObj = {
      title: req.body.title,
      emoji: req.body.emoji,
      description: req.body.description,
      categoryId: req.body.categoryId ? new ObjectId(req.body.categoryId) : undefined,
      questions: req.body.questions,
    };

    Object.keys(updates).forEach((key) => updates[key] === undefined && delete updates[key]);

    quizzes.updateOne({ _id: new ObjectId(req.body.quizId) }, { $set: updates });
    res.sendStatus(200);
  } catch (error:any) {
    if (error.message === 'Argument passed in must be a Buffer or string of 12 bytes or a string of 24 hex characters' || error.code === 121) {
      res.sendStatus(400);
      return;
    }

    next(error);
  }
});

export default router;
