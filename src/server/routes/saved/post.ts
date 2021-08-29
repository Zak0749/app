import express from 'express';
import { ObjectId } from 'mongodb';
import { QuizCol, SavedCol } from '../../..';
import db from '../../db/get';

const router = express.Router();

router.post('/api/saved', async (req, res, next) => {
  try {
    if (!req.currentUser) { res.sendStatus(401); return; }

    const users = await db.users;
    const quizzes = await db.quizzes;

    const user = req.currentUser;
    const quiz = await quizzes.findOne({ _id: new ObjectId(req.body.quizId) }) as QuizCol;

    if (!quiz) {
      res.sendStatus(400);
      return;
    }

    const saved:SavedCol = {
      date: new Date(),
      quizId: new ObjectId(req.body.quizId),
    };

    await users.updateOne({ _id: new ObjectId(user._id) }, { $push: { saved } });

    res.sendStatus(201);
  } catch (err:any) {
    if (err.message === 'Argument passed in must be a Buffer or string of 12 bytes or a string of 24 hex characters'
        || err.code === 121
        || err.message === "Cannot read property 'toString' of undefined") {
      res.sendStatus(400);
      return;
    }
    next(err);
  }
});

export default router;
