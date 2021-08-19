import express from 'express';
import bcrypt from 'bcrypt';
import db from '../../db/get';

const router = express.Router();

router.post('/api/user', async (req, res, next) => {
  try {
    const users = await db.users;

    const password = await bcrypt.hash(req.body.password, 10);

    const user: usercol = {
      ...req.body,
      date: new Date(),
      password,
      history: [],
      saved: [],
      drafts: [],
    };

    await users.insertOne(user);
    res.sendStatus(201);
  } catch (error) {
    if (error.code === 121 || error.code === 11000 || error.toString() === 'Error: data must be a string or Buffer and salt must either be a salt string or a number of rounds' || error.toString() === 'Error: data and salt arguments required') {
      res.status(400).json(error);
      return;
    }

    next(error);
  }
});

export default router;
