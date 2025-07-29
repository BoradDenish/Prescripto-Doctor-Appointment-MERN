import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'
import axiosInstance from '../api/axiosInstance';
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const MyAppointments = () => {
    const { backendUrl, token } = useContext(AppContext)
    const navigate = useNavigate()

    const [appointments, setAppointments] = useState([])
    const [payment, setPayment] = useState('')

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // Function to format the date eg. ( 20_01_2000 => 20 Jan 2000 )
    const slotDateFormat = (slotDate) => {
        const dateArray = slotDate.split('_')
        return dateArray[0] + " " + months[Number(dateArray[1])] + " " + dateArray[2]
    }

    // Getting User Appointments Data Using API
    const getUserAppointments = async () => {
        try {
            const { data } = await axiosInstance.get(backendUrl + '/api/user/appointments', { headers: { token } })
            setAppointments(data.appointments.reverse())

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    // Function to cancel appointment Using API
    const cancelAppointment = async (appointmentId) => {
        try {
            const { data } = await axiosInstance.post(backendUrl + '/api/user/cancel-appointment', { appointmentId }, { headers: { token } })

            if (data.success) {
                toast.success(data.message)
                getUserAppointments()
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    const initPay = (order) => {
        const options = {
            key: import.meta.env.VITE_RAZORPAY_KEY_ID,
            amount: order.amount,
            currency: order.currency,
            name: 'Appointment Payment',
            description: "Appointment Payment",
            order_id: order.id,
            receipt: order.receipt,
            handler: async (response) => {
                try {
                    const { data } = await axiosInstance.post(backendUrl + "/api/user/verifyRazorpay", response, { headers: { token } });
                    if (data.success) {
                        navigate('/my-appointments')
                        getUserAppointments()
                    }
                } catch (error) {
                    console.log(error)
                    toast.error(error.message)
                }
            }
        };
        const rzp = new window.Razorpay(options);
        rzp.open();
    };

    // Function to make payment using razorpay
    const appointmentRazorpay = async (appointmentId) => {
        try {
            const { data } = await axiosInstance.post(backendUrl + '/api/user/payment-razorpay', { appointmentId }, { headers: { token } })
            if (data.success) {
                initPay(data.order)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    // Function to make payment using stripe
    const appointmentStripe = async (appointmentId) => {
        try {
            const { data } = await axiosInstance.post(backendUrl + '/api/user/payment-stripe', { appointmentId }, { headers: { token } })
            if (data.success) {
                const { session_url } = data
                window.location.replace(session_url)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        if (token) {
            getUserAppointments()
        }
    }, [token])

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <p className='text-3xl font-semibold text-gray-700 border-b pb-4 mb-6'>My Appointments</p>

            <div className="space-y-6">
                {appointments.map((item, index) => (
                    <div key={index} className="bg-white shadow-lg rounded-lg border border-gray-200 p-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
                        <div className="flex justify-center sm:justify-start">
                            <img className='w-32 h-32 rounded-full object-cover shadow-md' src={item.docData.image} alt="Doctor" />
                        </div>
                        <div className="flex flex-col justify-between text-sm text-gray-600 sm:col-span-2">
                            <p className='text-xl font-semibold text-[#262626]'>{item.docData.name}</p>
                            <p className='text-sm text-gray-500'>{item.docData.speciality}</p>
                            <div className="mt-3">
                                <p className='font-medium text-gray-700'>Address:</p>
                                <p className='text-sm text-gray-500'>{item.docData.address.line1}</p>
                                <p className='text-sm text-gray-500'>{item.docData.address.line2}</p>
                            </div>
                            <p className='mt-4 text-sm text-[#3C3C3C]'>
                                <span className='font-medium'>Date & Time:</span> {slotDateFormat(item.slotDate)} | {item.slotTime}
                            </p>
                        </div>

                        <div className="flex flex-col justify-between items-center text-sm">
                            {!item.cancelled && !item.payment && !item.isCompleted && payment !== item._id && (
                                <button onClick={() => setPayment(item._id)} className='py-2 px-6 bg-primary text-white rounded-md hover:bg-primary-dark transition duration-300 w-full mt-3'>
                                    Pay Online
                                </button>
                            )}
                            {!item.cancelled && !item.payment && !item.isCompleted && payment === item._id && (
                                <button onClick={() => appointmentStripe(item._id)} className='flex items-center justify-center py-2 px-6 border border-gray-300 rounded-md hover:bg-gray-100 transition duration-300 w-full mt-3'>
                                    <img className='max-w-20 max-h-5' src={assets.stripe_logo} alt="Stripe" />
                                </button>
                            )}
                            {!item.cancelled && !item.payment && !item.isCompleted && payment === item._id && (
                                <button onClick={() => appointmentRazorpay(item._id)} className='flex items-center justify-center py-2 px-6 border border-gray-300 rounded-md hover:bg-gray-100 transition duration-300 w-full mt-3'>
                                    <img className='max-w-20 max-h-5' src={assets.razorpay_logo} alt="Razorpay" />
                                </button>
                            )}
                            {!item.cancelled && item.payment && !item.isCompleted && (
                                <button className='py-2 px-6 bg-gray-100 text-gray-500 rounded-md w-full mt-3'>
                                    Paid
                                </button>
                            )}
                            {item.isCompleted && (
                                <button className='py-2 px-6 bg-green-100 text-green-500 rounded-md w-full mt-3'>
                                    Completed
                                </button>
                            )}

                            {!item.cancelled && !item.isCompleted && (
                                <button onClick={() => cancelAppointment(item._id)} className='py-2 px-6 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300 w-full mt-3'>
                                    Cancel Appointment
                                </button>
                            )}
                            {item.cancelled && !item.isCompleted && (
                                <button className='py-2 px-6 bg-red-100 text-red-500 rounded-md w-full mt-3'>
                                    Appointment Cancelled
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default MyAppointments
    