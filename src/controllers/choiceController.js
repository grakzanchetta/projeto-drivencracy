import dayjs from 'dayjs';
import { ObjectId } from 'mongodb';
import db from '../databases/mongo.js';

export async function postChoice(request, response) {

    const { title, pollId } = request.body;

    try {
     
        const searchPoll = await db.collection('polls').findOne({ _id: new ObjectId(pollId) });
        const searchChoice = await db.collection('choices').findOne({ title });

        if (!searchPoll) {
            return response.status(404).send(`Questionário de id ${pollId} não existe!`);
        }

        if (searchChoice) {
            return response.status(409).send(`Opção de nome ${title} já existe!`);
        }

        if ((dayjs(searchPoll.expireAt).isBefore(dayjs()))) {
            return response.status(403).send('Enquete já expirada!');
        }

        await db.collection('choices').insertOne({title: title, pollId: pollId });
        response.status(201).send(`Opção para a enquete de Id ${pollId} e nome ${title} criada!`)

    } catch (error) {
        response.status(500)
    }

}

export async function getChoices(request, response) {


}

