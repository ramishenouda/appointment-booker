import express from 'express';
import bodyParser from 'body-parser'

import appointmentRoutes from './routes/appointment.js'

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use('/api/appointments', appointmentRoutes);

app.listen(PORT, () => console.log(`Server is running on port: http://localhost:${PORT}/`));
