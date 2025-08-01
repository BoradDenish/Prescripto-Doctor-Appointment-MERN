import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { assets } from '../assets/assets';
import RelatedDoctors from '../components/RelatedDoctors';
import axiosInstance from '../api/axiosInstance';
import { toast } from 'react-toastify';

const Appointment = () => {

    const { docId } = useParams();
    const { doctors, currencySymbol, backendUrl, token, getDoctosData } = useContext(AppContext);
    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

    const [docInfo, setDocInfo] = useState(false);
    const [docSlots, setDocSlots] = useState([]);
    const [slotIndex, setSlotIndex] = useState(0);
    const [slotTime, setSlotTime] = useState('');

    const navigate = useNavigate();

    const fetchDocInfo = async () => {
        const docInfo = doctors.find((doc) => doc._id === docId);
        setDocInfo(docInfo);
    };

    const getAvailableSolts = async () => {

        setDocSlots([]);

        // getting current date
        let today = new Date();

        for (let i = 0; i < 7; i++) {

            // getting date with index 
            let currentDate = new Date(today);
            currentDate.setDate(today.getDate() + i);

            // setting end time of the date with index
            let endTime = new Date();
            endTime.setDate(today.getDate() + i);
            endTime.setHours(21, 0, 0, 0);

            // setting hours 
            if (today.getDate() === currentDate.getDate()) {
                currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
                currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
            } else {
                currentDate.setHours(10);
                currentDate.setMinutes(0);
            }

            let timeSlots = [];

            while (currentDate < endTime) {
                let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

                let day = currentDate.getDate();
                let month = currentDate.getMonth() + 1;
                let year = currentDate.getFullYear();

                const slotDate = day + "_" + month + "_" + year;
                const slotTime = formattedTime;

                const isSlotAvailable = docInfo.slots_booked[slotDate] && docInfo.slots_booked[slotDate].includes(slotTime) ? false : true;

                if (isSlotAvailable) {

                    // Add slot to array
                    timeSlots.push({
                        datetime: new Date(currentDate),
                        time: formattedTime
                    });
                }

                // Increment current time by 30 minutes
                currentDate.setMinutes(currentDate.getMinutes() + 30);
            }

            setDocSlots(prev => ([...prev, timeSlots]));

        }

    };

    const bookAppointment = async () => {

        if (!token) {
            toast.warning('Login to book appointment');
            return navigate('/login');
        }

        const date = docSlots[slotIndex][0].datetime;

        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();

        const slotDate = day + "_" + month + "_" + year;

        try {

            const { data } = await axiosInstance.post(backendUrl + '/api/user/book-appointment', { docId, slotDate, slotTime }, { headers: { token } });
            if (data.success) {
                toast.success(data.message);
                getDoctosData();
                navigate('/my-appointments');
            } else {
                toast.error(data.message);
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }

    };

    useEffect(() => {
        if (doctors.length > 0) {
            fetchDocInfo();
        }
    }, [doctors, docId]);

    useEffect(() => {
        if (docInfo) {
            getAvailableSolts();
        }
    }, [docInfo]);

    return docInfo ? (
        <div className="font-['Poppins', sans-serif]">

            {/* ---------- Doctor Details ----------- */}
            <div className="flex flex-col sm:flex-row gap-6 my-8">
                <div>
                    <img className="bg-primary w-full sm:max-w-[300px] rounded-lg shadow-lg transition-transform transform hover:scale-105 duration-500 ease-in-out" src={docInfo.image} alt="" />
                </div>

                <div className="flex-1 border border-[#ddd] rounded-lg p-6 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <p className="flex items-center gap-2 text-3xl font-semibold text-gray-800">{docInfo.name} <img className="w-5" src={assets.verified_icon} alt="" /></p>
                    <div className="flex items-center gap-2 mt-2 text-gray-600">
                        <p>{docInfo.degree} - {docInfo.speciality}</p>
                        <button className="py-1 px-3 border text-xs rounded-full">{docInfo.experience}</button>
                    </div>

                    <div>
                        <p className="flex items-center gap-1 text-sm font-medium text-[#262626] mt-3">About <img className="w-3" src={assets.info_icon} alt="" /></p>
                        <p className="text-sm text-gray-700 mt-1">{docInfo.about}</p>
                    </div>

                    <p className="text-gray-600 font-medium mt-4">Appointment fee: <span className="text-gray-800">{currencySymbol}{docInfo.fees}</span></p>
                </div>
            </div>

            {/* Booking slots */}
            <div className="sm:ml-[280px] sm:pl-12 mt-8 font-medium text-[#565656]">
            <p className="text-lg pt-6 font-semibold text-gray-800">Booking slots</p>
            <div className="flex gap-3 p-2 items-center w-full overflow-x-scroll mt-4">
                {docSlots.length && docSlots.map((item, index) => (
                    <div 
                        onClick={() => setSlotIndex(index)} 
                        key={index} 
                        className={`text-center py-4 min-w-20 rounded-[50px] min-h-10 cursor-pointer transition-all duration-300 transform hover:scale-105 ${slotIndex === index ? 'bg-primary text-white shadow-lg' : 'border border-[#DDDDDD] hover:bg-[#f4f4f4]'}`}
                    >
                        <p className="font-medium">{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                        <p className="text-sm font-light">{item[0] && item[0].datetime.getDate()}</p>
                    </div>
                ))}
            </div>

            <div className="flex items-center gap-3 w-full overflow-x-scroll mt-4 p-1">
                {docSlots.length && docSlots[slotIndex].map((item, index) => (
                    <p 
                        onClick={() => setSlotTime(item.time)} 
                        key={index} 
                        className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer transition-all duration-300 transform hover:scale-105 ${item.time === slotTime ? 'bg-primary text-white shadow-md' : 'text-[#949494] border border-[#B4B4B4] hover:bg-[#f4f4f4]'}`}
                    >
                        {item.time.toLowerCase()}
                    </p>
                ))}
            </div>

                <button 
                    onClick={bookAppointment} 
                    className="bg-primary text-white text-sm font-light px-20 py-3 rounded-full my-6 transition-all duration-300 hover:bg-primary-dark transform hover:scale-105 shadow-lg"
                >
                    Book an appointment
                </button>
            </div>


            {/* Listing Related Doctors */}
            <RelatedDoctors speciality={docInfo.speciality} docId={docId} />
        </div>
    ) : null;
};

export default Appointment;

