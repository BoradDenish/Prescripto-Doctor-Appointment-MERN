// models/Prescription.js


import mongoose from 'mongoose';

const prescriptionSchema = new mongoose.Schema({
    doctor_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor', // Reference to the Doctor model
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true
    },
    medication: {
        type: String,
        required: true
    },
    dosage: {
        type: String,
        required: true
    },
    instructions: {
        type: String,
        required: true
    },
    date_prescribed: {
        type: Number,
        default: Date.now
    },
    userData: { type: Object, required: true },
});

const Prescription = mongoose.model('Prescription', prescriptionSchema);
export default Prescription;
