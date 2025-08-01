import express from 'express';
import { loginDoctor,  DoctorlistPrescription,DeleteUserPrescriptions, appointmentsDoctor, appointmentCancel, doctorList, changeAvailablity, appointmentComplete, doctorDashboard, doctorProfile, updateDoctorProfile, addPrescription } from '../controllers/doctorController.js';
import authDoctor from '../middleware/authDoctor.js';

const doctorRouter = express.Router();

doctorRouter.post("/login", loginDoctor)
doctorRouter.post("/cancel-appointment", authDoctor, appointmentCancel)
doctorRouter.get("/appointments", authDoctor, appointmentsDoctor)
doctorRouter.get("/list", doctorList)
doctorRouter.post("/change-availability", authDoctor, changeAvailablity)
doctorRouter.post("/complete-appointment", authDoctor, appointmentComplete)
doctorRouter.get("/dashboard", authDoctor, doctorDashboard)
doctorRouter.get("/profile", authDoctor, doctorProfile)
doctorRouter.post("/update-profile", authDoctor, updateDoctorProfile)
doctorRouter.post("/add-prescription", authDoctor, addPrescription)
doctorRouter.get("/list-prescription", authDoctor, DoctorlistPrescription);
doctorRouter.post("/delete-prescription", authDoctor, DeleteUserPrescriptions);




export default doctorRouter;