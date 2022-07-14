import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const mongoClient = new MongoClient(process.env.MONGO_URI);

await mongoClient.connect();
const db = mongoClient.db('dcracy');
console.log(`Database running on ${process.env.MONGO_URI}`);

export default db;