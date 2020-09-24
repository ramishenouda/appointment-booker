import mongoose from 'mongoose'
import nodemailer from 'nodemailer'

import config from '../config.js'

import appointment from '../models/appointment.js'
import Appointment from '../models/appointment.js' 

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    service: 'gmail',
    secure: false, // use SSL
    auth: {
        user: config.nodeMailerUser,
        pass: config.nodeMailerPassword
    },
    logger: true
});


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
            var mailOptions = {
                from: 'bookapp24@gmail.com',
                to: requestBody.email,
                subject: 'We got your request',
                html: (`
                    <p>We got your information. We will back to you soon</p>
                    <p>FirstName: ${requestBody.firstName}</p>
                    <p>LastName: ${requestBody.lastName}</p>
                    <p>Email: ${requestBody.email}</p>
                    <p>PhoneNumber: ${requestBody.countryCode} ${requestBody.phoneNumber}</p>
                    <p>Operation countries: ${requestBody.operationCountries}</p>
                    <p>Company name: ${requestBody.companyName}</p>
                    <p>Objective: ${requestBody.objective}</p>
                    <p>Description: ${requestBody.description}</p>
                    <p>Request date: ${new Date()}</p>
                `)
            };
            
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });

            mailOptions.to = 'bookapp24@gmail.com';
            mailOptions.html = `                    
                <p> New Request </p>
                <p>FirstName: ${requestBody.firstName}</p>
                <p>LastName: ${requestBody.lastName}</p>
                <p>Email: ${requestBody.email}</p>
                <p>PhoneNumber: ${requestBody.countryCode} ${requestBody.phoneNumber}</p>
                <p>Operation countries: ${requestBody.operationCountries}</p>
                <p>Company name: ${requestBody.companyName}</p>
                <p>Objective: ${requestBody.objective}</p>
                <p>Description: ${requestBody.description}</p>
                <p>Request date: ${new Date()}</p>
            `

            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });

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
