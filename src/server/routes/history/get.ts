import { Router } from 'express';
import db from '../../db/get';
import { formQuiz } from '../../helpers/form-quiz';
import onlyOn from '../../helpers/auth';
import { QuizCol } from '../../..';

const router = Router();

router.get('/api/history', onlyOn.authenticated, async (req, res, next) => {
  try {
    const quizzes = await db.quizzes;
    const session = req.currentUser;

    if (!session) {
      res.sendStatus(400);
      return;
    }

    const history = await Promise.all(session.history.map(async (element) => ({
      quiz: await formQuiz((await quizzes.findOne({ _id: element.quizId }) as QuizCol), session),
      date: element.date,
      progress: element.progress,
    })));

    res.status(200).json(history);
  } catch (err:any) {
    next(err);
  }
});

export default router;
