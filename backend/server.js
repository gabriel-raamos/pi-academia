import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import Cliente from './models/Cliente.js'
import bcrypt from 'bcryptjs'
import bodyParser from 'body-parser'

import dotenv from 'dotenv'
dotenv.config()

const app = express()
const port = 5000

app.use(cors())
app.use(express.json())

app.use(bodyParser.json())

import connectDB from './connectMongo.js'

connectDB()

// test
app.get('/api/test', async (req, res) => {
    res.send(process.env.MONGO_URL)

    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDB conectado`);
      } catch (err) {
        console.error(`Error: ${err.message}`);
        process.exit(1); // Exit process with failure
      }

})

// test2
app.get('/api/', (req, res) => {
    res.send('test')
})

// registrar
app.post('/api/register', async (req, res) => {

    const { name, email, password, date, phone, cpf, cep, height, weight } = req.body

    try {
        const newCliente = new Cliente({ name, email, password, date, phone, cpf, cep, height, weight })

        await newCliente.save()
        res.status(201).send('Usuário registrado')
    }

    catch (error) {
        console.error('Error registering user', error);
        res.status(400).json({
            message: 'Error registering user',
            error: error.message,
            // details: error
        });
    }

})

// login
app.post('/api/login', async (req, res) => {
    const { name, password } = req.body;
    try {
        const cliente = await Cliente.findOne({ name });
        if (!cliente) {
            return res.status(404).json({ message: 'User not found' });
        }
        const isMatch = await bcrypt.compare(password, cliente.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        res.status(200).json({ message: 'Login successful' });
    } catch (error) {
        console.error('Error during login', error);
        res.status(500).json({
            message: 'Server error',
            error: error.message,
            details: error
        });
    }

})

// Rota para testar a conexão com o MongoDB
app.get('/api/test-mongodb-connection', (req, res) => {
    if (mongoose.connection.readyState === 1) {
        res.send('Conexão com o MongoDB estabelecida com sucesso');
    } else {
        res.status(500).send('Erro ao conectar ao MongoDB');
    }
});

app.get('/api/whatsapp', async (req, res) => {
    const response = await Cliente.find({});
    // console.log(response);
    // res.send("encontramos uma resposta com certeza");
    res.send(response)
})


app.listen(port, () => {
    console.log(`Server rodando na porta ${port}`)
})