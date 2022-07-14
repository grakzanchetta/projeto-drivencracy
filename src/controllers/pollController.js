import dayjs from "dayjs";

import db from "../databases/mongo.js";

export async function postPoll (request, response){

const { title, expireAt } = request.body;

    try {
        if (!expireAt){
            let expirationDate = dayjs().add(1, "month").format("YYYY-MM-D HH:mm")
            await db.collection('polls').insertOne({title, expireAt: expirationDate });
            return response.status(201).send(`Enquete "${title}", com expiração em ${expirationDate} foi criada!`);    
        }
        await db.collection('polls').insertOne({title, expireAt});
        return response.status(201).send(`Enquete "${title}", com expiração em ${expireAt} foi criada!`);
    } catch (error) {
        console.log(error)
        return response.status(500).send('Não foi possível publicar a enquete!!!');
    }
}

export async function getPolls (request, response){

    const pollsList = await db.collection("polls").find().toArray();

    try {
        return response.send(pollsList);
    } catch (error) {
        console.log(error);
        return response.status(500).send('Não foi possível retornar a lista de enquetes!!!')
    }


}









