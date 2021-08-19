import { Router } from 'express';
import { ObjectId } from 'mongodb';
import db from '../../db/get';
import { formUser } from '../../helpers/form-user';

const router = Router();

router.get('/api/user/:id', async (req, res, next) => {
  try {
    const users = await db.users;

    const user = await users.findOne({ _id: new ObjectId(req.params.id) }) as usercol;

    if (!user) {
      res.sendStatus(400);
      return;
    }

    const formedData = await formUser(user, req.currentUser);

    res.status(200).json(formedData);
  } catch (err) {
    if (err.message === 'Argument passed in must be a Buffer or string of 12 bytes or a string of 24 hex characters') {
      res.sendStatus(400);
      return;
    }

    next(err);
  }
});

export default router;
