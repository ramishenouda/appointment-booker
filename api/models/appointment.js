import mongoose from 'mongoose'

const appointmentSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstName: String,
    lastName: String,
    email: String,
    countryCode: String,
    phoneNumber: Number,
    operationCountries: String,
    companyName: String,
    objective: String,
    description: String,
    sentDate: { type: Date, default: Date.now }
})

export default mongoose.model('Appointment', appointmentSchema);
