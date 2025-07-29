import axiosInstance from '../api/axiosInstance';
import { createContext, useState, useEffect } from "react";
import { toast } from "react-toastify";


export const AdminContext = createContext()

const AdminContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000"
    // const backendUrl = "http://localhost:4000"

    const [aToken, setAToken] = useState(localStorage.getItem('aToken') ? localStorage.getItem('aToken') : '')

    const [appointments, setAppointments] = useState([])
    const [doctors, setDoctors] = useState([])
    const [dashData, setDashData] = useState(false)

    const autoCancelAppointments = () => {
        console.log("Checking for expired appointments: ");
        appointments.forEach(async (appointment) => {
            const currentTime = Date.now(); // Get current timestamp
            // console.log("appointment:------>", appointment);

            // Parse the slotDate in format "6_4_2025" (assumed format is day_month_year)
            const [day, month, year] = appointment.slotDate.split('_');
            const [hour, minuteAndPeriod] = appointment.slotTime.split(':');  // Split hour and minute + AM/PM
            const [minute, period] = minuteAndPeriod.split(' '); // Split minute and period (AM/PM)

            console.log(day, month, year, hour, minute, period);

            // Convert 12-hour time format to 24-hour format
            let hour24 = parseInt(hour);
            if (period === 'PM' && hour24 !== 12) {
                hour24 += 12; // Convert PM hours to 24-hour format
            } else if (period === 'AM' && hour24 === 12) {
                hour24 = 0; // 12 AM is midnight
            }

            // console.log("Converted 24-hour time:", hour24, minute);

            // Create a new Date object using the parsed values (year, month - 1, day, hour24, minute)
            const appointmentDate = new Date(year, month - 1, day, hour24, minute);

            // console.log("appointmentDate:--->", appointmentDate);

            // // Log the parsed date for debugging
            // console.log("Current time:", new Date(currentTime));
            // console.log("Appointment time:", appointmentDate);
            // console.log("iddddd:------->", appointment._id, appointmentDate < currentTime, !appointment.cancelled, appointment.isCompleted);

            // If the appointment time is in the past and it hasn't been completed yet, cancel it
            if (appointmentDate < currentTime && !appointment.cancelled && !appointment.isCompleted) {
                await cancelAppointment(appointment._id); // Automatically cancel the appointment
            }
        });
    };

    const startAutoCancelInterval = () => {
        // Start checking for expired appointments every 10 seconds (10000 ms)
        const intervalId = setInterval(() => {
            autoCancelAppointments();
        }, 10000); 

        // Clear the interval after all appointments have been checked
        return intervalId;
    };

    // Getting all Doctors data from Database using API
    const getAllDoctors = async () => {

        try {

            const { data } = await axiosInstance.get(backendUrl + '/api/admin/all-doctors', { headers: { aToken } })
            if (data.success) {
                setDoctors(data.doctors)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }

    }

    // Function to change doctor availablity using API
    const changeAvailability = async (docId) => {
        try {

            const { data } = await axiosInstance.post(backendUrl + '/api/admin/change-availability', { docId }, { headers: { aToken } })
            if (data.success) {
                toast.success(data.message)
                getAllDoctors()
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }


    // Getting all appointment data from Database using API
    const getAllAppointments = async () => {

        try {

            const { data } = await axiosInstance.get(backendUrl + '/api/admin/appointments', { headers: { aToken } })
            if (data.success) {
                setAppointments(data.appointments.reverse())
                // autoCancelAppointments();
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }

    }

    // Function to cancel appointment using API
    const cancelAppointment = async (appointmentId) => {

        try {

            const { data } = await axiosInstance.post(backendUrl + '/api/admin/cancel-appointment', { appointmentId }, { headers: { aToken } })

            if (data.success) {
                toast.success(data.message, appointmentId)
                getAllAppointments()
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
            console.log(error)
        }

    }

    // Getting Admin Dashboard data from Database using API
    const getDashData = async () => {
        try {

            const { data } = await axiosInstance.get(backendUrl + '/api/admin/dashboard', { headers: { aToken } })

            if (data.success) {
                setDashData(data.dashData)
                console.log("Hello: ", data.dashData)
                // autoCancelAppointments();
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

    }

    useEffect(() => {
        const intervalId = startAutoCancelInterval(); // Start checking expired appointments
        getDashData();
        // Cleanup the interval when the component is unmounted
        return () => clearInterval(intervalId);
    }, [appointments]);

    const value = {
        aToken, setAToken,
        doctors,
        getAllDoctors,
        changeAvailability,
        appointments,
        getAllAppointments,
        getDashData,
        cancelAppointment,
        dashData
    }

    return (
        <AdminContext.Provider value={value}>
            {props.children}
        </AdminContext.Provider>
    )

}

export default AdminContextProvider