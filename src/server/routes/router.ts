import { Router } from 'express';

import userPost from './user/post';
import userGet from './user/get';
import userDelete from './user/delete';

import quizPost from './quiz/post';
import quizGet from './quiz/get';
import quizPatch from './quiz/patch';
import quizDelete from './quiz/delete';

import draftPost from './draft/post';
import draftGet from './draft/get';
import draftPatch from './draft/patch';
import draftDelete from './draft/delete';

import savedPost from './saved/post';
import savedGet from './saved/get';
import savedDelete from './saved/delete';

import historyPost from './history/post';
import historyGet from './history/get';
import historyDelete from './history/delete';

import category from './category';
import categorys from './categorys';

import continueQuiz from './continue';

import discover from './discover';

import search from './search';

const router = Router();

router.use(userPost);
router.use(userGet);
router.use(userDelete);

router.use(quizPost);
router.use(quizPatch);
router.use(quizGet);
router.use(quizDelete);

router.use(draftPost);
router.use(draftGet);
router.use(draftPatch);
router.use(draftDelete);

router.use(savedPost);
router.use(savedGet);
router.use(savedDelete);

router.use(historyPost);
router.use(historyGet);
router.use(historyDelete);

router.use(category);
router.use(categorys);

router.use(continueQuiz);
router.use(discover);
router.use(search);

export default router;
