import express from 'express'
import 'express-async-errors'
import bodyParser from "body-parser";
import cors from 'cors'
import {MONGO_URL, PORT} from "./config/config";
import mongoose from "mongoose";
import {postRouter} from "./routes/posts.router";


const server = express();
server.use(bodyParser.json({limit: '30mb'}));
server.use(bodyParser.urlencoded({limit: '30mb', extended: true}));
server.use(cors());

server.use('/posts', postRouter);

(async ()=> {

    try {
        await mongoose.connect(MONGO_URL )
        server.listen(PORT as number, 'localhost', ()=> console.log(`Server listen on port ${PORT}`))
    }
    catch (e) {
        console.log(e)
    }
    })();





