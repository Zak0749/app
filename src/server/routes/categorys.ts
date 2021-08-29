import { Router } from 'express';
import { CategoryCol } from '../..';
import db from '../db/get';

const router = Router();

router.get('/api/categorys', async (req, res, next) => {
  try {
    const categeoryCollection = await db.categorys;

    const categorys = await categeoryCollection.find<CategoryCol>({}).toArray();

    res.status(200).json(
      categorys.map((val) => ({ title: val.title, _id: val._id?.toHexString() })),
    );
  } catch (error:any) {
    next(error);
  }
});
export default router;
