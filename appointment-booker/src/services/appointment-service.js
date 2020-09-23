import axios from 'axios'

const APIUri = 'http://localhost:5000/api'

export async function getAppointments() {
    const options = {
        url: `${APIUri}/appointments`,
        method: 'GET',
        headers: {
            Accept: 'application/json',
        }
    };

    return (await axios(options));
}

export async function getAppointment(appointmentId) {
    const options = {
        url: `${APIUri}/appointments/${appointmentId}`,
        method: 'GET',
        headers: {
            Accept: 'application/json',
        }
    };

    return (await axios(options));
}

export async function bookAppointment(appointmentInfo) {
    const options = {
        url: `${APIUri}/appointments`,
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
        },
        data: {
            appointmentInfo
        }
    };

    return (await axios(options));
}

export async function deleteAppointment(appointmentId) {
    const options = {
        url: `${APIUri}/appointments/${appointmentId}`,
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json;charset=UTF-8',
        }
    };

    return (await axios(options));
}
