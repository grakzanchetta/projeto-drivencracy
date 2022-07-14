import cors from 'cors';
import express from 'express';

import router from './routes/indexRouter.js'

const server = express();
server.use(cors());
server.use(express.json());

server.use(router);

server.listen(process.env.PORT, () =>{
    console.log(`Server open in PORT ${process.env.PORT}`)
})
