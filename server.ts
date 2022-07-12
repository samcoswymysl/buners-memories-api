import express, {Request, Response} from 'express'
import 'express-async-errors'
import bodyParser from "body-parser";
import cors from 'cors'
import {MONGO_URL} from "./config/config";
import mongoose from "mongoose";
import {postRouter} from "./routes/posts.router";

const PORT = process.env.PORT || 5000


const server = express();
server.use(bodyParser.json({limit: '30mb'}));
server.use(bodyParser.urlencoded({limit: '30mb', extended: true}));
server.use(cors());

server.use('/posts', postRouter);

server.get('/', (_req: Request, res: Response)=> {
    res.send('Hello to memories api')
});

(async ()=> {

    try {
        await mongoose.connect(MONGO_URL )
        server.listen(PORT as number, 'localhost', ()=> console.log(`Server listen on port ${PORT}`))
    }
    catch (e) {
        console.log(e)
    }
    })();





