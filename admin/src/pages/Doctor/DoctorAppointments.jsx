import React from 'react';
import { useContext, useEffect } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets';
import { useNavigate } from 'react-router-dom';

const DoctorAppointments = () => {
  const { dToken, appointments, getAppointments, cancelAppointment, completeAppointment, handleSetAppointmentId } = useContext(DoctorContext);
  const { slotDateFormat, calculateAge, currency } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken]);

  const handleViewPrescriptions = (appointmentId) => {
    console.log(appointmentId);
    handleSetAppointmentId(appointmentId); // Store the appointmentId in context
    navigate('/prescriptions'); // Navigate to the prescriptions page
  };

  return (
    <div className='w-full max-w-6xl m-5'>
      <p className='mb-3 text-lg font-medium'>All Appointments</p>

      <div className='bg-white border rounded text-sm max-h-[80vh] overflow-y-scroll'>
        <div className='max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr_1fr] gap-1 py-3 px-6 border-b'>
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & Time</p>
          <p>Fees</p>
          <p>Action</p>
          <p>Prescription</p> {/* Add a column header for the prescriptions button */}
        </div>
        {appointments.map((item, index) => (
  <div 
    key={item._id} 
    className='flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50 transition-colors duration-300 ease-in-out'>
    <p className='max-sm:hidden'>{index + 1}</p>
    <div className='flex items-center gap-2'>
      <img src={item.userData.image} className='w-8 rounded-full' alt="" />
      <p>{item.userData.name}</p>
    </div>
    <div>
      <p className='text-xs inline border border-primary px-2 rounded-full'>
        {item.payment ? 'Online' : 'CASH'}
      </p>
    </div>
    <p className='max-sm:hidden'>{calculateAge(item.userData.dob)}</p>
    <p>{slotDateFormat(item.slotDate)}, {item.slotTime}</p>
    <p>{currency}{item.amount}</p>
    {item.cancelled
      ? <p className='text-red-400 text-xs font-medium'>Cancelled</p>
      : item.isCompleted
        ? <p className='text-green-500 text-xs font-medium'>Completed</p>
        : <div className='flex'>
          <img
            onClick={() => cancelAppointment(item._id)}
            className='w-10 cursor-pointer transform transition duration-300 hover:scale-110 opacity-80 hover:opacity-100'
            src={assets.cancel_icon}
            alt="Cancel Appointment"
            aria-label="Cancel Appointment"
          />
          <img
            onClick={() => completeAppointment(item._id)}
            className='w-10 cursor-pointer transform transition duration-300 hover:scale-110 opacity-80 hover:opacity-100'
            src={assets.tick_icon}
            alt="Complete Appointment"
            aria-label="Complete Appointment"
          />
        </div>
    }
    {/* Conditional Rendering for Prescription Button */}
    {!item.cancelled && (
      <button
        onClick={() => handleViewPrescriptions(item._id)}
        className="text-white bg-blue-400 hover:bg-blue-500 focus:ring-4 focus:ring-blue-400 font-medium rounded-lg text-xs px-4 py-2 transition duration-300 ease-in-out transform hover:scale-105 active:scale-100">
        Prescriptions
      </button>
    )}
  </div>
))}

      </div>
    </div>
  );
};

export default DoctorAppointments;