import { Router } from 'express';
import { Quiz, QuizCol } from '../..';
import db from '../db/get';
import { formQuizzes } from '../helpers/form-quiz';

const router = Router();

router.get('/api/explore', async (req, res, next) => {
  try {
    const quizzes = await db.quizzes;
    const session = req.currentUser;

    let forYou: Quiz[] | undefined;

    if (session) {
      if (session.history[0]) {
        const lastQuiz = await quizzes.findOne({ _id: session.history[0].quizId }) as QuizCol;
        if (lastQuiz) {
          const forU = await quizzes.find({ categoryId: lastQuiz.categoryId }).sort({ plays: -1 }).limit(12).toArray() as QuizCol[];
          forYou = await formQuizzes(forU, session);
        }
      }
    }

    const featured = await quizzes.find({ featured: true }).sort({ plays: -1 }).limit(12).toArray() as QuizCol[];
    const popular = await quizzes.find().sort({ plays: -1 }).limit(12).toArray() as QuizCol[];

    res.status(200).json({
      featured: await formQuizzes(featured, session),
      popular: await formQuizzes(popular, session),
      forYou,
    });
  } catch (error:any) {
    next(error);
  }
});

export default router;
