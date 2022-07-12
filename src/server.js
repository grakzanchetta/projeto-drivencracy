import express from 'express';
import dotenv from 'dotenv';


dotenv.config();
const server = express();
server.use(express.json());

server.listen(process.env.PORT, () => 
    console.log (`Server running on port ${process.env.PORT}`)
)