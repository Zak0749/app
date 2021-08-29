import { Router } from 'express';
import { ObjectId } from 'mongodb';
import db from '../../db/get';
import onlyOn from '../../helpers/auth';

const router = Router();

router.delete('/api/draft', onlyOn.authenticated, async (req, res, next) => {
  try {
    if (!req.currentUser) { res.sendStatus(401); return; }

    const users = await db.users;
    const session = req.currentUser;

    const draft = session.drafts.find((item) => item._id?.toHexString() === req.body.draftId);

    if (!draft) {
      res.sendStatus(400);
      return;
    }

    await users.updateOne({ _id: new ObjectId(session._id) }, { $pull: { drafts: { _id: new ObjectId(req.body.draftId) } } });
    res.sendStatus(200);
  } catch (err:any) {
    next(err);
  }
});

export default router;
