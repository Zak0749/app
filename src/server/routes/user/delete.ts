import express from 'express';
import bcrypt from 'bcrypt';
import db from '../../db/get';
import onlyOn from '../../helpers/auth';
import { UserCol } from '../../..';

const router = express.Router();

router.delete('/api/user', onlyOn.authenticated, async (req, res, next) => {
  try {
    const users = await db.users;
    const quizzes = await db.quizzes;
    const user = await users.findOne({ username: req.body.username }) as UserCol;

    if (!user || user._id.toHexString() !== req.currentUser?._id.toString()) {
      res.sendStatus(400);
      return;
    }

    const passwordCorrect = await bcrypt.compare(req.body.password, user.password);

    if (passwordCorrect !== true) {
      res.status(400).json('bad password');
      return;
    }

    await users.deleteOne({ username: req.body.username });
    await quizzes.deleteMany({ userId: user._id });

    res.sendStatus(200);
  } catch (error:any) {
    if (error.toString() === 'Error: data and hash arguments required' || error.toString() === 'Error: data and hash must be strings') {
      res.sendStatus(400);
      return;
    }

    next(error);
  }
});

export default router;
