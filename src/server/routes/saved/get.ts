import { Router } from 'express';
import db from '../../db/get';
import { formQuiz } from '../../helpers/form-quiz';

const router = Router();

router.get('/api/saved', async (req, res, next) => {
  try {
    if (!req.currentUser) { res.sendStatus(401); return; }

    const quizzes = await db.quizzes;

    const saved = await Promise.all(req.currentUser.saved.map(async (element) => ({
      quiz: await formQuiz((await quizzes.findOne({ _id: element.quizId }) as quizcol), req.currentUser),
      date: element.date,
    })));

    res.status(200).json(saved);
  } catch (err) {
    next(err);
  }
});

export default router;
