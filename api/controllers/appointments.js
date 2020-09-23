import mongoose from 'mongoose'
import appointment from '../models/appointment.js'

import Appointment from '../models/appointment.js' 

export const getAppointments = (req, res) => {
    appointment.find({}).exec()
        .then((result) => {
            res.send(result);
        }).catch((err) => {
            res.sendStatus(500)
        });
}

export const getAppointment = (req, res) => {
    const { id } = req.params;
    Appointment.findById(id).exec()
        .then((result) => {
            res.send(result);
        }).catch((err) => {
            res.sendStatus(404)
        });
}

export const makeAppointment = (req, res) => {
    let requestBody;

    if (req.body.appointmentInfo)
        requestBody = req.body.appointmentInfo
    else
        requestBody = req.body

    const appointment = new Appointment({
        _id: new mongoose.Types.ObjectId,
        firstName: requestBody.firstName,
        lastName: requestBody.lastName,
        email: requestBody.email,
        countryCode: requestBody.countryCode,
        phoneNumber: requestBody.phoneNumber,
        operationCountries: requestBody.operationCountries,
        companyName: requestBody.companyName,
        objective: requestBody.objective,
        description: requestBody.description,
    })

    appointment.save()
        .then((result) => {
            res.sendStatus(200);
        }).catch((err) => {
            res.sendStatus(500);
        });
}

export const deleteAppointment = (req, res) => {
    const { id } = req.params;
    Appointment.remove({ _id: id }).exec()
        .then((result) => {
            res.send(200)
        }).catch((err) => {
            res.send(500)
        });
}
