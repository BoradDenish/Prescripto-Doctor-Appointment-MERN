import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";
import Prescription  from "../models/Prescription.js"
import userModel  from "../models/userModel.js"


// API for doctor Login 
const loginDoctor = async (req, res) => {

    try {

        const { email, password } = req.body
        const user = await doctorModel.findOne({ email })

        if (!user) {
            return res.json({ success: false, message: "Invalid credentials" })
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: "Invalid credentials" })
        }


    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get doctor appointments for doctor panel
const appointmentsDoctor = async (req, res) => {
    try {

        const { docId } = req.body
        const appointments = await appointmentModel.find({ docId })

        res.json({ success: true, appointments })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to cancel appointment for doctor panel
const appointmentCancel = async (req, res) => {
    try {

        const { docId, appointmentId } = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)
        if (appointmentData && appointmentData.docId === docId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })
            return res.json({ success: true, message: 'Appointment Cancelled' })
        }

        res.json({ success: false, message: 'Appointment Cancelled' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// API to mark appointment completed for doctor panel
const appointmentComplete = async (req, res) => {
    try {

        const { docId, appointmentId } = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)
        if (appointmentData && appointmentData.docId === docId) {
            await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true })
            return res.json({ success: true, message: 'Appointment Completed' })
        }

        res.json({ success: false, message: 'Appointment Cancelled' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// API to get all doctors list for Frontend
const doctorList = async (req, res) => {
    try {

        const doctors = await doctorModel.find({}).select(['-password', '-email'])
        res.json({ success: true, doctors })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

// API to change doctor availablity for Admin and Doctor Panel
const changeAvailablity = async (req, res) => {
    try {

        const { docId } = req.body

        const docData = await doctorModel.findById(docId)
        await doctorModel.findByIdAndUpdate(docId, { available: !docData.available })
        res.json({ success: true, message: 'Availablity Changed' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get doctor profile for  Doctor Panel
const doctorProfile = async (req, res) => {
    try {

        const { docId } = req.body
        const profileData = await doctorModel.findById(docId).select('-password')

        res.json({ success: true, profileData })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to update doctor profile data from  Doctor Panel
const updateDoctorProfile = async (req, res) => {
    try {

        const { docId, fees, address, available } = req.body

        await doctorModel.findByIdAndUpdate(docId, { fees, address, available })

        res.json({ success: true, message: 'Profile Updated' })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// API to get dashboard data for doctor panel
const doctorDashboard = async (req, res) => {
    try {

        const { docId } = req.body

        const appointments = await appointmentModel.find({ docId })

        let earnings = 0

        appointments.map((item) => {
            if (item.isCompleted || item.payment) {
                earnings += item.amount
            }
        })

        let patients = []

        appointments.map((item) => {
            if (!patients.includes(item.userId)) {
                patients.push(item.userId)
            }
        })


        const dashData = {
            earnings,
            appointments: appointments.length,
            patients: patients.length,
            latestAppointments: appointments.reverse()
        }

        res.json({ success: true, dashData })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


// Function to add prescription
const addPrescription = async (req, res) => {
    const { appointmentId, medication, dosage, instructions } = req.body;

    try {
            const appointment = await appointmentModel.findById(appointmentId);
            const doctorId = appointment.docId;
            const userId = appointment.userId;
            const userData = await userModel.findById(userId).select("-password")

        // Create a new Prescription
        const prescription = new Prescription({
            doctor_id: doctorId,
            user_id: userId,
            medication,
            dosage,
            instructions,
            userData
        });

        await prescription.save(); // Save prescription to database

        res.json({ success: true, message: 'Prescription saved!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to save prescription.' });
    }
}
const DoctorlistPrescription = async (req, res) => {
    console.log(req.body)
    try {
        const searchQuery = req.query.search || '';
        const doctorId = req.body.docId;

        if (!doctorId) {
            return res.json({ success: false, message: 'Doctor ID is required' });
        }

        const prescriptions = await Prescription.find({
            'doctor_id': doctorId,
            'userData.name': { $regex: searchQuery, $options: 'i' }
        });

        if (prescriptions.length > 0) {
            res.json({ success: true, prescriptions })
        }else{
            res.json({ success: false, message: 'No prescriptions found' });
        }


    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
 }

 const DeleteUserPrescriptions = async (req, res) => {
    const { id } = req.body; // Now you're extracting the ID from the request body
    console.log("id:---", id)
    try {
      const prescription = await Prescription.findByIdAndDelete(id);
      if (!prescription) {
        return res.json({ success: false, message: "Prescription not found" });
      }
      return res.json({ success: true, message: "Prescription deleted successfully" });
    } catch (error) {
      console.error(error);
      return res.json({ success: false, message: "An error occurred while deleting the prescription" });
    }
  };
  
    


// module.exports = router;

export {
    loginDoctor,
    appointmentsDoctor,
    appointmentCancel,
    doctorList,
    changeAvailablity,
    appointmentComplete,
    doctorDashboard,
    doctorProfile,
    updateDoctorProfile,
    addPrescription,
    DoctorlistPrescription,
    DeleteUserPrescriptions
}