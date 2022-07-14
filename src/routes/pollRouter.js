import { Router } from 'express';

import {pollValidator }from '../middlewares/pollValidator.js';
import {postPoll, getPolls} from '../controllers/pollController.js'
import { getChoices } from '../controllers/choiceController.js';

const pollRouter = Router();

pollRouter.post('/poll', pollValidator, postPoll);
pollRouter.get('/poll', getPolls);
pollRouter.get('/poll/:id/choice', getChoices);

export default pollRouter;