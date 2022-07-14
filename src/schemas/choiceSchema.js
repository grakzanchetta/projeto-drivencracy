import joi from 'joi';
import JoiObjectId from "joi-objectid";

const myJoiObjectId = JoiObjectId(joi);
const choiceSchema = joi.object({
    title: joi.string().required(),
    pollId: myJoiObjectId().required()
});

export default choiceSchema;