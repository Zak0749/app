import { Router } from 'express';
import { ObjectId } from 'mongodb';
import db from '../../db/get';
import onlyOn from '../../helpers/auth';

const router = Router();

router.patch('/api/draft', onlyOn.authenticated, async (req, res, next) => {
  try {
    if (!req.currentUser) { res.sendStatus(401); return; }

    const users = await db.users;
    const categorys = await db.categorys;

    const session = req.currentUser;

    const drafts = [...session.drafts];
    const draftIndex = drafts.findIndex((draft) => draft._id?.toHexString() === req.body.draftId);
    const draft = drafts[draftIndex];

    if (!draft) {
      res.sendStatus(400);
      return;
    }

    if (req.body.categoryId) {
      const category = await categorys.findOne({ _id: new ObjectId(req.body.categoryId) }) as categorycol;

      if (!category) {
        res.sendStatus(400);
        return;
      }
    }

    const updated: draftcol = {
      _id: new ObjectId(draft._id),
      title: req.body.title || draft.title,
      emoji: req.body.emoji || draft.emoji,
      date: draft.date,
      description: req.body.description || draft.description,
      categoryId: req.body.categoryId ? new ObjectId(req.body.categoryId) : undefined || draft.categoryId,
      questions: req.body.questions || draft.questions,
    };

    drafts[draftIndex] = updated;

    users.updateOne({ _id: new ObjectId(session._id) }, { $set: { drafts } });
    res.sendStatus(200);
  } catch (error) {
    if (error.message === 'Argument passed in must be a Buffer or string of 12 bytes or a string of 24 hex characters') {
      res.sendStatus(400);
      return;
    }

    next(error);
  }
});

export default router;
