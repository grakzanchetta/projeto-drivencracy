import { Router } from 'express';

import { postVote, getResult } from '../controllers/voteController.js';

const voteRouter = Router();

voteRouter.post('/choice/:id/vote', postVote);
voteRouter.get('/poll/:id/result', getResult);


export default voteRouter;