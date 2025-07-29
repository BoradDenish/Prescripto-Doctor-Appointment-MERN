import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axiosInstance from '../api/axiosInstance';
import { toast } from 'react-toastify';

const MyPrescriptions = () => {
    const { backendUrl, token } = useContext(AppContext);

    const [prescriptions, setPrescriptions] = useState([]);

    // Function to format the timestamp into a readable date (e.g., 28 Dec, 2024 Sunday)
    const slotDateFormat = (timestamp) => {
        const date = new Date(Number(timestamp)); // Convert the timestamp to a Date object

        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const day = date.getDate(); // Day of the month
        const month = months[date.getMonth()]; // Month name
        const year = date.getFullYear(); // Year
        const weekday = date.toLocaleString('en-us', { weekday: 'long' }); // Weekday name (e.g., Sunday)

        return `${day} ${month}, ${year} ${weekday}`;
    };

    const getUserPrescriptions = async () => {
        try {
            const { data } = await axiosInstance.get(backendUrl + '/api/user/prescription-list', {
                headers: { token }, // Send the token in the header for authentication
            });
            console.log("Prescriptions", data);
            setPrescriptions(data.prescriptions.reverse());
        } catch (error) {
            console.log(error);
            toast.error(error.message);
        }
    };

    useEffect(() => {
        if (token) {
            getUserPrescriptions();
        }
    }, [token]);

    return (
        <div className="container mx-auto px-4">
            <p className='pb-6 b-10 mt-12 text-2xl font-semibold text-black border-b '> My Prescriptions </p>
            <div className="space-y-4">
                {prescriptions.map((item, index) => (
                    <div
                        key={index}
                        className="transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg border-b p-4 rounded-lg bg-white shadow-sm hover:bg-gray-50"
                    >
                        <div className="flex flex-col sm:flex-row sm:gap-6 border-2 border-gray-300 rounded-lg p-6 ">
                            <div className="flex-1 text-sm text-gray-600">
                                <p className='text-lg font-semibold text-gray-600'>Medicine : {item.medication}</p>
                                <p className='text-lg font-semibold text-gray-600'>Instructions : {item.instructions}</p>
                                <p className='text-lg font-semibold text-gray-600'>Dosage : {item.dosage}</p>

                                {/* Display the date in the correct format */}
                                <p className='mt-3'>
                                    <span className='text-sm text-gray-700 font-medium'>Date & Time : </span>
                                    {slotDateFormat(item.date_prescribed)}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MyPrescriptions;
