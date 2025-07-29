import React, { useContext, useEffect, useState } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { toast } from 'react-toastify';
import axiosInstance from '../../api/axiosInstance';

const MyPrescriptions = () => {
    const { backendUrl, dToken } = useContext(DoctorContext);
    console.log("Token in the request header:", dToken);

    const [prescriptions, setPrescriptions] = useState([]);
    const [search, setSearch] = useState('');
    const [focus, setFocus] = useState(false);
    const [selectedPrescription, setSelectedPrescription] = useState(null); // Track selected prescription for modal
    const [showDeleteModal, setShowDeleteModal] = useState(false); // State for showing confirmation modal
    const [prescriptionToDelete, setPrescriptionToDelete] = useState(null); // Prescription to delete

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

    const getUserPrescriptions = async (searchQuery = '') => {
        console.log("hello--->")
        const { data } = await axiosInstance.get(backendUrl + '/api/doctor/list-prescription', { headers: { dToken }, params: { search: searchQuery }, });
        console.log("data: ---->", data)
        try {
            setPrescriptions(data.prescriptions.reverse());
        } catch (error) {
            setPrescriptions([]);  // Clear prescriptions if no data is found
            toast.error(data.message || "No prescriptions found.");
        }
    };

    const deleteUserPrescriptions = async (prescriptionId) => {
        try {
            // Send the ID in the request body
            const { data } = await axiosInstance.post(`${backendUrl}/api/doctor/delete-prescription`, {
                id: prescriptionId // Include the prescription ID in the body
            }, {
                headers: { dToken } // Include the token in the headers
            });
    
            // If successful, remove the deleted prescription from the list
            setPrescriptions(prescriptions.filter(prescription => prescription._id !== prescriptionId));
            toast.success(data.message); // Show success message
            setShowDeleteModal(false); // Close the confirmation modal
        } catch (error) {
            console.error("Error deleting prescription:", error);
            toast.error("Error deleting prescription");
            setShowDeleteModal(false); // Close the confirmation modal on error
        }
    };

    const confirmDelete = (prescriptionId) => {
        setPrescriptionToDelete(prescriptionId); // Set the prescription to delete
        setShowDeleteModal(true); // Show the confirmation modal
    };

    const cancelDelete = () => {
        setShowDeleteModal(false); // Close the confirmation modal
        setPrescriptionToDelete(null); // Reset the prescription to delete
    };

    useEffect(() => {
        if (dToken) {
            getUserPrescriptions(search);
        } else {
            toast.error("dToken not available");
        }
    }, [dToken, search]);

    const closeModal = () => setSelectedPrescription(null); // Close the modal by setting null

    return (
        <div>
            <p className='pb-3 mt-12 pl-10 text-2xl font-medium text-black '>My Prescriptions</p>

            {/* Search input */}
            <div className='relative pl-7'>
                <input
                    type="text"
                    className="mb-4 p-3 pl-12 pr-4 border-2 border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ease-in-out"
                    placeholder="Search by user name"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)} // Update search term
                    onFocus={() => setFocus(true)} // Set focus state to true when input is focused
                    onBlur={() => setFocus(false)} // Set focus state to false when input loses focus
                />
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-5 w-6 absolute left-12 top-10 transform-translate-y-6 transform -translate-x-1 transition-all duration-300 ease-in-out ${search ? 'opacity-0' : 'text-black focus:text-blue-500'} ${focus ? 'text-blue-500' : 'text-black'}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-4.35-4.35M17 10a7 7 0 10-14 0 7 7 0 0014 0z"
                    />
                </svg>
            </div>

            {/* Prescriptions List */}
            {prescriptions.length === 0 ? (
                <p className="flex justify-center text-2xl items-center min-h-[450px] min-w-[1200px]  ">No data found</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pl-7">
                    {prescriptions.map((item, index) => (
                        <div
                            key={index}
                            className="bg-white pl-10 rounded-lg shadow-lg p-8 hover:scale-105 hover:shadow-xl hover:translate-y-2 transition-all duration-300 ease-in-out w-[270px] sm:w-[270px] md:w-[280px]"
                        >
                            <div className="text-gray-600">
                                {/* Show only User's Name and Date initially */}
                                <p
                                    className="text-xl font-semibold text-gray-700 cursor-pointer"
                                    onClick={() => setSelectedPrescription(item)} // Open modal on click
                                >
                                    {item.userData.name}
                                </p>
                                <p className="text-sm text-gray-500">{slotDateFormat(item.date_prescribed)}</p> {/* Display Date */}
                                <button
                                    className="mt-2 text-red-600 hover:text-red-800 text-sm"
                                    onClick={() => confirmDelete(item._id)} // Open confirmation modal
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal for detailed prescription */}
            {selectedPrescription && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3 relative">
                        {/* Close Button */}
                        <button
                            className="absolute top-2 right-5 text-gray-500 text-2xl transition-colors duration-300 ease-in-out hover:text-red-500"
                            onClick={closeModal} // Close modal on click
                        >
                            &times;
                        </button>

                        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Prescription Details</h2>
                        <p className="text-lg font-semibold text-gray-700">Medicine: {selectedPrescription.medication}</p>
                        <p className="text-lg font-semibold text-gray-700">Instructions: {selectedPrescription.instructions}</p>
                        <p className="text-lg font-semibold text-gray-700">Dosage: {selectedPrescription.dosage}</p>
                        <p className="text-sm text-gray-600">User: {selectedPrescription.userData.name}</p>
                        <p className="text-sm text-gray-600">Email: {selectedPrescription.userData.email}</p>
                        <p className="text-sm text-gray-600">Phone: {selectedPrescription.userData.phone} </p>
                        {/* <p className="text-sm text-gray-600">Doctor name: {selectedPrescription.doctorData.name } </p> */}
                        <p className="mt-3">
                            <span className="text-sm text-gray-700 font-medium">Date & Time: </span>
                            {slotDateFormat(selectedPrescription.date_prescribed)}
                        </p>
                    </div>
                </div>
            )}

            {/* Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3 relative">
                        <p className="text-xl font-semibold text-gray-800 mb-4">Are you sure you want to delete this prescription?</p>
                        <div className="flex justify-between">
                            <button
                                className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-800"
                                onClick={() => deleteUserPrescriptions(prescriptionToDelete)} // Delete the prescription
                            >
                                Yes, Delete
                            </button>
                            <button
                                className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-400"
                                onClick={cancelDelete} // Close the modal without deleting
                            >
                                No, Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MyPrescriptions;


