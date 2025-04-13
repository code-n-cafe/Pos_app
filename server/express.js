import 'dotenv/config';
import express from 'express'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import compress from 'compression'
import cors from 'cors'
import helmet from 'helmet'
import Template from './../template.js'
import customerRouter from './routes/customerRoutes.js'
import foodRouter from './routes/foodRouter.js'
import drinkRouter from './routes/beverageRouter.js'
import bookingRouter from './routes/bookingRouter.js'
import roomRouter from './routes/roomRouter.js'

const app = express()
app.get('/', (req, res) => {
    res.status(200).send(Template()) 
    })
    
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', drinkRouter)
app.use('/', foodRouter)
app.use('/', customerRouter)   
app.use('/', bookingRouter)
app.use('/', roomRouter)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(compress())
app.use(helmet())
app.use(cors({
    origin: 'http://localhost:5173' // Allow requests from the frontend
}));

app.options('*', cors());

export default app
