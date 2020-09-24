import express from 'express';
import path from 'path'
import { dirname } from 'path';
import { fileURLToPath } from 'url';

import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cors from 'cors'

import appointmentRoutes from './routes/appointment.js'
import config from './config.js'

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();

app.use(express.static(path.join(__dirname, 'build')));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

mongoose.connect(`mongodb+srv://admin:${config.dbPassword}@cluster0.4v6ca.mongodb.net/${config.dbName}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on('error', err => {
    console.log(err);
})


app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['https://appbooker24.herokuapp.com/', 'http://appbooker24.herokuapp.com/', 'http://localhost:5000/']);
    res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(cors());

app.use(bodyParser.json());
app.use('/api/appointments', appointmentRoutes);

app.listen(process.env.PORT || config.PORT || 5000, () => console.log(`Server is running on port: http://localhost:${config.PORT}/`));
