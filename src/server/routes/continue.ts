import { Router } from 'express';
import db from '../db/get';
import { formQuiz } from '../helpers/form-quiz';
import onlyOn from '../helpers/auth';

const router = Router();

router.get('/api/continue', onlyOn.authenticated, async (req, res, next) => {
  try {
    if (!req.currentUser) { res.sendStatus(401); return; }
    const quizzesCollection = await db.quizzes;
    const session = req.currentUser as usercol;
    const history = session.history.filter((val) => val.progress !== 1);

    const quizzes = await Promise.all(history.map(async (element) => ({
      quiz: await formQuiz((await quizzesCollection.findOne({ _id: element.quizId }) as quizcol), session),
      date: element.date,
      progress: element.progress,
    })));

    res.status(200).json(quizzes);
  } catch (error) {
    next(error);
  }
});

export default router;
