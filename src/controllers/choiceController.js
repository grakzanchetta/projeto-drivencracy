import dayjs from 'dayjs';
import { ObjectId } from 'mongodb';

import db from '../databases/mongo.js';

export async function postChoice(request, response){

const { title, pollId } = request.body;

    try {
        const searchId = ObjectId(pollId);
        const chosenPoll = await db.collection('polls').findOne({_id: searchId});

        if (!chosenPoll){
            return response.status(404).send(`Enquete com registro ${searchId} não encontrada!`);
        }

        if (dayjs() > chosenPoll.expireAt){
            return response.status(403).send('Esta enquete já foi encerrada!');
        }

        const pollChoices = await db.collection('choices').findOne({title});
        if(pollChoices){
            return response.status(409).send(`A opção de nome ${title} já foi inscrita!`);
        }

        await db.collection('choices').insertOne({...title, votes: 0});

        return response.status(201).send(`A opção ${title} foi adicionada!`)





    } catch (error) {
        console.log(error);
        return response.sendStatus(500);
    }
}