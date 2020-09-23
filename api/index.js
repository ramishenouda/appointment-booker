import express from 'express';
import bodyParser from 'body-parser'
import mongoose from 'mongoose'

import appointmentRoutes from './routes/appointment.js'
import config from './config.js'

const app = express();

mongoose.connect(`mongodb+srv://admin:${config.dbPassword}@cluster0.4v6ca.mongodb.net/${config.dbName}?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on('error', err => {
    console.log(err);
})

app.use(bodyParser.json());
app.use('/api/appointments', appointmentRoutes);

app.listen(config.PORT, () => console.log(`Server is running on port: http://localhost:${config.PORT}/`));
