import { Router } from 'express';

import { postVote } from '../controllers/voteController.js';

const voteRouter = Router();

voteRouter.post('/choice/:id/vote', postVote);


export default voteRouter;