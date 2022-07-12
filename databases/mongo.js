import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URL);
let db;
mongoClient.connect(() => {
    db = mongoClient.db(process.env.DB_PROJECT);
    console.log(`Database running on port ${process.env.MONGO_URL}`)
});

export default { db } ;