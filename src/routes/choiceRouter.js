import { Router } from 'express';

import { postChoice } from '../controllers/choiceController.js';
import { choiceValidate } from '../middlewares/choiceValidator.js';

const choiceRouter = Router();

choiceRouter.post('/choice', choiceValidate, postChoice);

export default choiceRouter;