import { Router } from 'express';
import db from '../db/get';

const router = Router();

router.get('/api/categorys', async (req, res, next) => {
  try {
    const categeoryCollection = await db.categorys;

    const categorys: categorycol[] = await categeoryCollection.find().toArray();

    res.status(200).json(
      categorys.map((val) => ({ title: val.title, _id: val._id?.toHexString() })),
    );
  } catch (error) {
    next(error);
  }
});
export default router;
