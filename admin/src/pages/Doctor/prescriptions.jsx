import React, { useContext, useEffect, useState } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../api/axiosInstance';

const PrescriptionsPage = () => {
    const { dToken, appointmentId } = useContext(DoctorContext); // Access appointmentId from context
    const { backendUrl } = useContext(AppContext);
    const navigate = useNavigate(); 

    const [prescriptions, setPrescriptions] = useState([]);
    const [newPrescription, setNewPrescription] = useState({
        medication: '',
        dosage: '',
        instructions: ''
    });
    const [isPrescriptionAdded, setIsPrescriptionAdded] = useState(false); // Track if prescription is added

    // Fetch prescriptions when component mounts
    useEffect(() => {
        const fetchPrescriptions = async () => {
            try {
                const response = await axiosInstance.get(`${backendUrl}/api/prescriptions/${appointmentId}`, {
                    headers: { dToken }
                });
                setPrescriptions(response.data); // Store prescriptions in state
            } catch (error) {
                console.error('Error fetching prescriptions', error);
            }
        };

        if (dToken && appointmentId) {
            fetchPrescriptions(); // Call the fetch function when the component mounts
        }
    }, [dToken, appointmentId, backendUrl]); // Re-run this effect if the dToken or appointmentId changes

    // Handle input change for adding a prescription
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewPrescription((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    // Handle adding a new prescription
    const handleAddPrescription = async (e) => {
        e.preventDefault();

        try {
            const response = await axiosInstance.post(
                `${backendUrl}/api/doctor/add-prescription`,
                { ...newPrescription, appointmentId },
                {
                    headers: {
                        dToken,
                    }
                }
            );
            setPrescriptions([...prescriptions, response.data]); // Update state with new prescription
            toast.success('Prescription added successfully');
            setNewPrescription({ medication: '', dosage: '', instructions: '' }); // Reset form
            setIsPrescriptionAdded(true); // Lock the button after adding prescription

            navigate('/list-prescriptions');
        } catch (error) {
            toast.error('Error adding prescription');
            console.error('Error adding prescription:', error);
        }
    };

    return (
        <div className="max-w-5xl mx-auto p-8">
            <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center transition-all duration-300 ease-in-out hover:text-indigo-600">Prescription Management</h2>

            {/* Prescription Form */}
            <form onSubmit={handleAddPrescription} className="space-y-8 bg-white p-8 rounded-lg shadow-xl mb-12 transition-transform transform hover:scale-105 hover:shadow-2xl">
                <h3 className="text-2xl font-semibold text-gray-700 mb-6">Add New Prescription</h3>
                <div className="flex flex-col gap-6">
                    <div>
                        <label htmlFor="medication" className="block text-gray-600 font-medium">Medication</label>
                        <input
                            type="text"
                            id="medication"
                            name="medication"
                            value={newPrescription.medication}
                            onChange={handleInputChange}
                            required
                            className="mt-2 p-4 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 ease-in-out"
                            disabled={isPrescriptionAdded} // Disable input if prescription is added
                        />
                    </div>
                    <div>
                        <label htmlFor="dosage" className="block text-gray-600 font-medium">Dosage</label>
                        <input
                            type="text"
                            id="dosage"
                            name="dosage"
                            value={newPrescription.dosage}
                            onChange={handleInputChange}
                            required
                            className="mt-2 p-4 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 ease-in-out"
                            disabled={isPrescriptionAdded} // Disable input if prescription is added
                        />
                    </div>
                    <div>
                        <label htmlFor="instructions" className="block text-gray-600 font-medium">Instructions</label>
                        <textarea
                            id="instructions"
                            name="instructions"
                            value={newPrescription.instructions}
                            onChange={handleInputChange}
                            required
                            rows="4"
                            className="mt-2 p-4 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200 ease-in-out"
                            disabled={isPrescriptionAdded} // Disable input if prescription is added
                        />
                    </div>
                    <button
                        type="submit"
                        className={`w-full py-3 rounded-lg transition-all duration-300 ease-in-out ${
                            isPrescriptionAdded
                                ? 'bg-gray-400 cursor-not-allowed'
                                : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                        }`}
                        disabled={isPrescriptionAdded} // Disable button if prescription is added
                    >
                        {isPrescriptionAdded ? 'Prescription Added' : 'Add Prescription'}
                    </button>
                </div>
            </form>

            {/* Prescriptions List */}
            <div>
                <h3 className="text-2xl font-semibold text-gray-700 mb-6">Prescription List</h3>
                {prescriptions.length > 0 ? (
                    <ul className="space-y-8">
                        {prescriptions.map((prescription) => (
                            <li
                                key={prescription._id}
                                className="bg-white p-6 rounded-lg shadow-md transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
                            >
                                <h4 className="text-2xl font-semibold text-gray-800">{prescription.medication}</h4>
                                <p className="text-gray-600 mt-2"><strong>Dosage:</strong> {prescription.dosage}</p>
                                <p className="text-gray-600 mt-2"><strong>Instructions:</strong> {prescription.instructions}</p>
                                <p className="text-gray-500 mt-2"><strong>Prescribed by:</strong> {prescription.doctor_id.name} ({prescription.doctor_id.specialty})</p>
                                <p className="text-gray-500 mt-2"><strong>Prescribed on:</strong> {new Date(prescription.date_prescribed).toLocaleDateString()}</p>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-gray-600">No prescriptions available for this appointment.</p>
                )}
            </div>
        </div>
    );
};

export default PrescriptionsPage;

