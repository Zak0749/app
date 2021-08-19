import { Router } from 'express';
import db from '../db/get';
import { formQuizzes } from '../helpers/form-quiz';
import { formUsers } from '../helpers/form-user';

const router = Router();

router.get('/api/search/:term', async (req, res, next) => {
  try {
    const usersCollection = await db.users;
    const quizzesCollection = await db.quizzes;

    const session = req.currentUser;

    const quizzes = await quizzesCollection
      .find({ $text: { $search: req.params.term } })
      .sort({ score: { $meta: 'textScore' } })
      .project({ score: { $meta: 'textScore' } })
      .limit(20)
      .toArray() as quizcol[];

    const users = await usersCollection
      .find({ $text: { $search: req.params.term } })
      .sort({ score: { $meta: 'textScore' } })
      .project({ score: { $meta: 'textScore' } })
      .limit(20)
      .toArray() as usercol[];

    res.status(200).json({
      users: await formUsers(users, session),
      quizzes: await formQuizzes(quizzes, session),
    });
  } catch (error) {
    next(error);
  }
});

export default router;
