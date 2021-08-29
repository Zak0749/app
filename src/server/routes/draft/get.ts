import { Router } from 'express';
import onlyOn from '../../helpers/auth';

const router = Router();

router.get('/api/draft', onlyOn.authenticated, async (req, res, next) => {
  try {
    if (!req.currentUser) { res.sendStatus(401); return; }

    const session = req.currentUser;
    res.status(200).json(session.drafts);
  } catch (error:any) {
    next(error);
  }
});

export default router;
