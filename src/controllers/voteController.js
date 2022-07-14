import dayjs from 'dayjs';
import {ObjectId} from 'mongodb';

import db from '../databases/mongo.js';

export async function postVote (request, response){

    const voteIndex = request.params.id;
    let timestamp = dayjs().format('YYYY-MM-D HH:mm:ss');

    try {
        const choice = await db.collection('choices').findOne({_id: new ObjectId(voteIndex)});
        
        if(!choice){
            return response.status(404).send(`Escolha não existente`);
        }
        const poll = await db.collection('polls').findOne({_id: new ObjectId(choice.pollId)})
        if((dayjs(poll.expireAt).isBefore(dayjs()))){
            return response.status(403).send('Enquete já expirou!')
        }

        await db.collection('votes').insertOne({createAt: timestamp, choiceId: voteIndex});
        response.status(201).send(`Voto na opção de id ${voteIndex} feito em ${timestamp}`);
    } catch (error) {
        response.status(500).send(error.message);
    }
}

export async function getResult(){

    
}
