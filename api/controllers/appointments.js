import { v4 as uuidv4 } from 'uuid'

let appointments = [
    {
        id: uuidv4(),
        firstName: "Rami",
        lastName: "Shenouda",
        email: "ramishenouda@outlook.com",
        countryCode: "+20",
        phoneNumber: "1551874208",
        operationCountries: "country1",
        companyName: "Company1, Company2",
        objective: "complaint",
        description: "nonsense text :nerd:",
        sentDate: "Wed Sep 23 2020 02:33:37 GMT+0200"
    }
]

export const getAppointments = (req, res) => {
    res.send(appointments)
}

export const getAppointment = (req, res) => {
    const { id } = req.params;
    const appointment = appointments.find(x => x.id === id);

    res.send(appointment)
}

export const makeAppointment = (req, res) => {
    appointments.push({id: uuidv4() , ...req.body})
    res.sendStatus(200);
}

export const deleteAppointment = (req, res) => {
    const { id } = req.params;
    appointments = appointments.filter(x => x.id !== id);

    res.send(appointments)
}
