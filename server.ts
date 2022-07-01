import express from 'express'
import 'express-async-errors'
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from 'cors'

const server = express()



server.use(bodyParser.json({limit: '30mb', extended: true}))
server.use(bodyParser.urlencoded({limit: '30mb', extended: true}))
server.use(cors())



server.listen(5000, 'localhost', ()=> console.log('Server listen on port 5000'))
