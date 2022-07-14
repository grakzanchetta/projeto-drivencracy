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

export async function getResult(request, response){

    const pollIndex = request.params.id;
    let mostVoted = 0;
    let votedChoice = 0;
    const counter = [];
    
    try {
        const chosenPoll = await db.collection('polls').findOne({_id: new ObjectId(pollIndex)});
        const choices = await db.collection('choices').find({ pollId: pollIndex }).toArray();
        const votes = await db.collection('votes').find({}).toArray();

        if(!chosenPoll){
            return response.status(404).send('Enquete não existe!')
        }
        
        for (let i = 0; i < choices.length; i++){
            counter.push(0);
            for (let j = 0; j < votes.length; j++){
                if(choices[i]._id == (new ObjectId(votes[j].choiceId).toString())){
                    counter[i] ++;
                    if(counter[i] > mostVoted){
                        votedChoice = i;
                        mostVoted = counter[i];
                    }
                }
            }
        }
       
        response.send({
            ...chosenPoll,
            result: {
              title: choices[votedChoice].title,
              votes: Math.max(...counter) 
            }
          });    
    } catch (error) {
        response.status(500).send(error.message);
    }     
}
