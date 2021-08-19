import express from 'express';
import { ObjectId } from 'mongodb';
import db from '../../db/get';

const router = express.Router();

router.post('/api/quiz', async (req, res, next) => {
  try {
    if (!req.currentUser) { res.sendStatus(401); return; }

    const quizzes = await db.quizzes;
    const categorys = await db.categorys;

    const category = await categorys.findOne({ _id: new ObjectId(req.body.categoryId) }) as categorycol;

    if (!category) {
      res.sendStatus(400);
      return;
    }

    const quiz: quizcol = {
      title: req.body.title as string,
      emoji: req.body.emoji as string,
      description: req.body.description as string,
      date: new Date(),
      featured: false,
      categoryId: new ObjectId(req.body.categoryId),
      questions: req.body.questions,
      userId: new ObjectId(req.currentUser._id),
      plays: 0,
    };

    await quizzes.insertOne(quiz);
    res.sendStatus(201);
  } catch (err) {
    if (err.code === 121 || err.message === 'Argument passed in must be a Buffer or string of 12 bytes or a string of 24 hex characters'
        || err.message === "Cannot read property 'toString' of undefined") {
      res.sendStatus(400);
      return;
    }

    next(err);
  }
});

export default router;
