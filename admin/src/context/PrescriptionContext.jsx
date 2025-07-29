import { createContext, useState } from "react";
import axiosInstance from '../api/axiosInstance';
import { toast } from 'react-toastify'


export const DoctorContext = createContext()

const DoctorContextProvider = (props) => {

    const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000"

    const [dToken, setDToken] = useState(localStorage.getItem('dToken') ? localStorage.getItem('dToken') : '')
    const [dashData, setDashData] = useState(false)
    const [profileData, setProfileData] = useState(false)

    // Getting Doctor dashboard data using API
    const getDashData = async () => {
        try {

            const { data } = await axiosInstance.get(backendUrl + '/api/doctor/dashboard', { headers: { dToken } })

            if (data.success) {
                setDashData(data.dashData)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

    }

    const value = {
        dToken, setDToken, backendUrl,
        dashData, getDashData,
        profileData, setProfileData,
    }

    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    )


}

export default DoctorContextProvider






















// // PrescriptionContext.jsx
// import React, { useState, useContext, useEffect } from 'react';
// import { AppContext } from './AppContext'; // Corrected path (no ../../ needed)
// import { assets } from '../../assets/assets';

// const DoctorDashboard = () => {
//   const { dToken, dashData, getDashData, cancelAppointment, completeAppointment } = useContext([]); // Adjust this part
//   const { slotDateFormat, currency } = useContext(AppContext); // Context usage

//   const [selectedAppointment, setSelectedAppointment] = useState(null);
//   const [prescription, setPrescription] = useState({
//     medication: '',
//     dosage: '',
//     instructions: '',
//   });

//   useEffect(() => {
//     if (dToken) {
//       getDashData();
//     }
//   }, [dToken]);

//   const handlePrescriptionChange = (e) => {
//     const { name, value } = e.target;
//     setPrescription((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleSavePrescription = async () => {
//     if (!selectedAppointment || !prescription.medication || !prescription.dosage || !prescription.instructions) {
//       alert("Please fill in all fields.");
//       return;
//     }

//     try {
//       const response = await fetch('/api/doctor/prescribe', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${dToken}`,
//         },
//         body: JSON.stringify({
//           appointmentId: selectedAppointment._id,
//           medication: prescription.medication,
//           dosage: prescription.dosage,
//           instructions: prescription.instructions,
//         }),
//       });

//       const data = await response.json();
//       if (data.success) {
//         alert('Prescription saved!');
//         setSelectedAppointment(null); // Reset selected appointment
//         setPrescription({ medication: '', dosage: '', instructions: '' }); // Reset form
//         getDashData(); // Refresh data
//       } else {
//         alert(data.message);
//       }
//     } catch (error) {
//       console.error('Error saving prescription:', error);
//       alert('Error saving prescription.');
//     }
//   };

//   return (
//     <div className='m-5'>
//       {/* Prescription Form */}
//       {selectedAppointment && (
//         <div className="bg-white p-4 mt-5 rounded">
//           <h3 className="font-semibold text-lg">Add Prescription for {selectedAppointment.userData.name}</h3>
//           <div>
//             <label>Medication</label>
//             <input
//               type="text"
//               name="medication"
//               value={prescription.medication}
//               onChange={handlePrescriptionChange}
//               className="border p-2 w-full"
//             />
//           </div>
//           <div className="mt-2">
//             <label>Dosage</label>
//             <input
//               type="text"
//               name="dosage"
//               value={prescription.dosage}
//               onChange={handlePrescriptionChange}
//               className="border p-2 w-full"
//             />
//           </div>
//           <div className="mt-2">
//             <label>Instructions</label>
//             <textarea
//               name="instructions"
//               value={prescription.instructions}
//               onChange={handlePrescriptionChange}
//               className="border p-2 w-full"
//             ></textarea>
//           </div>
//           <button
//             onClick={handleSavePrescription}
//             className="bg-blue-500 text-white px-4 py-2 mt-3 rounded"
//           >
//             Save Prescription
//           </button>
//         </div>
//       )}

//       <div className='bg-white'>
//         <div className='flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border'>
//           <img src={assets.list_icon} alt="" />
//           <p className='font-semibold'>Latest Bookings</p>
//         </div>

//         <div className='pt-4 border border-t-0'>
//           {dashData?.latestAppointments.slice(0, 5).map((item, index) => (
//             <div className='flex items-center px-6 py-3 gap-3 hover:bg-gray-100' key={index}>
//               <img className='rounded-full w-10' src={item.userData.image} alt="" />
//               <div className='flex-1 text-sm'>
//                 <p className='text-gray-800 font-medium'>{item.userData.name}</p>
//                 <p className='text-gray-600 '>Booking on {slotDateFormat(item.slotDate)}</p>
//               </div>
//               {item.cancelled
//                 ? <p className='text-red-400 text-xs font-medium'>Cancelled</p>
//                 : item.isCompleted
//                   ? <p className='text-green-500 text-xs font-medium'>Completed</p>
//                   : <div className='flex'>
//                     <img onClick={() => cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
//                     <img onClick={() => completeAppointment(item._id)} className='w-10 cursor-pointer' src={assets.tick_icon} alt="" />
//                     <button
//                       onClick={() => setSelectedAppointment(item)}
//                       className="text-blue-500 text-xs font-medium"
//                     >
//                       Add Prescription
//                     </button>
//                   </div>
//               }
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DoctorDashboard;
