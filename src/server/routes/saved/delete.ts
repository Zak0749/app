import { ObjectId } from 'mongodb';
import express from 'express';
import db from '../../db/get';
import onlyOn from '../../helpers/auth';

const router = express.Router();

router.delete('/api/saved', onlyOn.authenticated, async (req, res, next) => {
  try {
    const users = await db.users;
    const quizzes = await db.quizzes;
    const user = req.currentUser;
    const quiz = await quizzes.findOne({ _id: new ObjectId(req.body.quizId) }) as quizcol;

    if (!quiz) {
      res.sendStatus(400);
      return;
    }

    await users.updateOne({ _id: new ObjectId(user?._id) }, { $pull: { saved: { quizId: new ObjectId(req.body.quizId) } } });

    res.sendStatus(200);
  } catch (err) {
    if (err.message === 'Argument passed in must be a Buffer or string of 12 bytes or a string of 24 hex characters') {
      res.sendStatus(400);
      return;
    }

    next(err);
  }
});

export default router;
