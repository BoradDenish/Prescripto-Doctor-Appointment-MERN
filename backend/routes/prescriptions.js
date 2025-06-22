// routes/prescriptions.js
const express = require('express');
const router = express.Router();
const Prescription = require('../models/Prescription');

// Middleware to check if user is a doctor
const { verifyDoctor } = require('../middleware/auth');

// POST route to create a new prescription
router.post('/add', verifyDoctor, async (req, res) => {
    try {
        const { user_id, medication, dosage, instructions } = req.body;
        const doctor_id = req.doctor.id; // assuming doctor is authenticated and ID is in the request

        // Create the new prescription
        const newPrescription = new Prescription({
            doctor_id,
            user_id,
            medication,
            dosage,
            instructions
        });

        // Save to the database
        await newPrescription.save();

        // Respond with the created prescription
        res.status(201).json(newPrescription);
    } catch (error) {
        res.status(500).json({ message: 'Error creating prescription', error });
    }
});

module.exports = router;


// routes/prescriptions.js
// Fetch prescriptions for a specific user by a specific doctor
router.get('/user/:user_id', verifyDoctor, async (req, res) => {
    try {
        const user_id = req.params.user_id;
        const doctor_id = req.doctor.id; // Get authenticated doctor ID from middleware

        // Find prescriptions for the user created by the authenticated doctor
        const prescriptions = await Prescription.find({ user_id, doctor_id })
            .populate('doctor_id', 'name specialty') // Populate doctor details
            .exec();

        res.status(200).json(prescriptions);
    } catch (error) {
        console.error('Error fetching prescriptions:', error);
        res.status(500).json({ message: 'Error fetching prescriptions', error });
    }
});

module.exports = router;

// router.get('/user/:user_id', async (req, res) => {
//     try {
//         const user_id = req.params.user_id;

//         // Find all prescriptions for the given user
//         const prescriptions = await Prescription.find({ user_id })
//             .populate('doctor_id', 'name specialty') // Populate doctor details
//             .exec();

//         res.status(200).json(prescriptions);
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching prescriptions', error });
//     }
// });
