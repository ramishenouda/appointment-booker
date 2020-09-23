import express from 'express'

import {  getAppointments, getAppointment, makeAppointment, deleteAppointment } from '../controllers/appointments.js'

const router = express.Router();

router.get('/', getAppointments)

router.get('/:id', getAppointment)

router.post('/', makeAppointment);

router.delete('/:id', deleteAppointment);

export default router;
