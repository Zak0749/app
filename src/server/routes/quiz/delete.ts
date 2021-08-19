import express from 'express';
import { ObjectId } from 'mongodb';
import db from '../../db/get';

const router = express.Router();

router.delete('/api/quiz', async (req, res, next) => {
  try {
    const quizzes = await db.quizzes;
    const user = req.currentUser;

    if (!user) {
      res.sendStatus(401);
      return;
    }

    const quiz = await quizzes.findOne({ _id: new ObjectId(req.body.quizId) }) as quizcol;

    if (!quiz) {
      res.sendStatus(400);
      return;
    }

    if (quiz.userId.toHexString() !== user._id.toString()) {
      res.sendStatus(400);
      return;
    }

    await quizzes.deleteOne({ _id: new ObjectId(req.body.quizId) });
    res.sendStatus(200);
  } catch (err) {
    if (err.message === "Cannot read property 'toString' of undefined"
        || err.message === 'Argument passed in must be a Buffer or string of 12 bytes or a string of 24 hex characters') {
      res.sendStatus(400);
      return;
    }

    next(err);
  }
});

export default router;
