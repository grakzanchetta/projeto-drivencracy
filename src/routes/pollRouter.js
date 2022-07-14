import { Router } from 'express';

import {pollValidator }from '../middlewares/pollValidator.js';
import {postPoll, getPolls} from '../controllers/pollController.js'

const pollRouter = Router();

pollRouter.post('/poll', pollValidator, postPoll);
pollRouter.get('/poll', getPolls);

export default pollRouter;