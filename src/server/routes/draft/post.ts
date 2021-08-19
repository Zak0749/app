import { Router } from 'express';
import { ObjectId } from 'mongodb';
import db from '../../db/get';
import onlyOn from '../../helpers/auth';

const router = Router();

router.post('/api/draft', onlyOn.authenticated, async (req, res, next) => {
  try {
    const users = await db.users;
    const categorys = await db.categorys;
    const session = req.currentUser;

    if (!session) {
      res.sendStatus(400);
      return;
    }

    const category = await categorys.findOne(
      { _id: new ObjectId(req.body.categoryId) },
    ) as categorycol;

    if (!category) {
      res.sendStatus(400);
      return;
    }

    const draft = {
      _id: new ObjectId(),
      title: req.body.title as string,
      emoji: req.body.emoji as string,
      description: req.body.description as string,
      date: new Date(),
      categoryId: new ObjectId(req.body.categoryId),
      questions: req.body.questions,
    };

    await users.updateOne({ _id: new ObjectId(session._id) }, { $push: { drafts: draft } });
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
