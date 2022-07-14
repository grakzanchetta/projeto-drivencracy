import { Router } from 'express';
import pollRouter from './pollRouter.js';
import choiceRouter from './choiceRouter.js';
import voteRouter from './voteRouter.js';

const router = Router();
router.use(pollRouter);
router.use(choiceRouter);
router.use(voteRouter);
export default router;