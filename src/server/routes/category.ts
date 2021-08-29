import { Router } from 'express';
import { ObjectId } from 'mongodb';
import { CategoryCol, QuizCol } from '../..';
import db from '../db/get';
import { formQuizzes } from '../helpers/form-quiz';

const router = Router();

router.get('/api/category/:id', async (req, res, next) => {
  try {
    const categorys = await db.categorys;
    const quizCollection = await db.quizzes;
    const session = req.currentUser;

    const category = await categorys.findOne({
      _id: new ObjectId(req.params.id),
    }) as CategoryCol;

    if (!category) {
      res.sendStatus(400);
      return;
    }

    const quizzes = await quizCollection.find<QuizCol>({ categoryId: new ObjectId(req.params.id) }).toArray();

    res.status(200).json({
      _id: category._id?.toHexString(),
      title: category.title,
      quizzes: await formQuizzes(quizzes, session),
    });
  } catch (error: any) {
    if (error.message === 'Argument passed in must be a Buffer or string of 12 bytes or a string of 24 hex characters') {
      res.sendStatus(400);
      return;
    }

    next(error);
  }
});

export default router;
