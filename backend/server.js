import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'

import dotenv from 'dotenv'
dotenv.config()

const app = express()
const port = 5000

app.use(express.json())
app.use(bodyParser.json())

const allowedOrigins = ['http://localhost:5173', 'http://localhost:5000', 'https://pi-academia.vercel.app'];

const corsOptions = {
    origin: function (origin, callback) {
        if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
};

app.use(cors(corsOptions))

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // Permite todas as origens
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});


import connectDB from './connectMongo.js'

connectDB()

import indexRoutes from './routes/indexRoutes.js'

app.use('/api', indexRoutes);

app.listen(port, () => {
    console.log(`Server rodando na porta ${port}`)
})