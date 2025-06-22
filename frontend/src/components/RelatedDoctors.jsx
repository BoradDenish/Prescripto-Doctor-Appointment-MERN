import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const RelatedDoctors = ({ speciality, docId }) => {

    const navigate = useNavigate();
    const { doctors } = useContext(AppContext);

    const [relDoc, setRelDoc] = useState([]);

    useEffect(() => {
        if (doctors.length > 0 && speciality) {
            const doctorsData = doctors.filter((doc) => doc.speciality === speciality && doc._id !== docId);
            setRelDoc(doctorsData);
        }
    }, [doctors, speciality, docId]);

    return (
        <div className="flex flex-col items-center gap-6 my-16 text-[#262626] font-sans">
            <h1 className="text-4xl font-semibold text-center text-[#333333] mb-4">Related Doctors</h1>
            <p className="text-sm sm:w-1/3 text-center text-[#777] mb-6">Explore trusted doctors based on your health needs. Browse their profiles to learn more.</p>
            <div className="w-50  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 sm:px-0">
                {relDoc.map((item, index) => (
                    <div
                        onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0); }}
                        key={index}
                        className="border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer transition-transform transform hover:scale-105 duration-500 ease-in-out hover:shadow-xl"
                    >
                        <img className="bg-[#EAEFFF] w-full h-60 object-cover transition-all duration-300" src={item.image} alt={item.name} />
                        <div className="p-4">
                            <div className={`flex items-center gap-2 text-sm justify-center ${item.available ? 'text-green-500' : "text-red-500"}`}>
                                <div className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-500' : "bg-red-500"}`}></div>
                                <p>{item.available ? 'Available' : "Not Available"}</p>
                            </div>
                            <p className="text-[#262626] text-lg font-medium text-center mt-2">{item.name}</p>
                            <p className="text-[#5C5C5C] text-sm text-center mt-1">{item.speciality}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RelatedDoctors;


// import React, { useContext, useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { AppContext } from '../context/AppContext'
// const RelatedDoctors = ({ speciality, docId }) => {

//     const navigate = useNavigate()
//     const { doctors } = useContext(AppContext)

//     const [relDoc, setRelDoc] = useState([])

//     useEffect(() => {
//         if (doctors.length > 0 && speciality) {
//             const doctorsData = doctors.filter((doc) => doc.speciality === speciality && doc._id !== docId)
//             setRelDoc(doctorsData)
//         }
//     }, [doctors, speciality, docId])

//     return (
//         <div className='flex flex-col items-center gap-4 my-16 text-[#262626]'>
//             <h1 className='text-3xl font-medium'>Related Doctors</h1>
//             <p className='sm:w-1/3 text-center text-sm'>Simply browse through our extensive list of trusted doctors.</p>
//             <div className='w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
//                 {relDoc.map((item, index) => (
//                     <div onClick={() => { navigate(`/appointment/${item._id}`); scrollTo(0, 0) }} className='border border-[#C9D8FF] rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500' key={index}>
//                         <img className='bg-[#EAEFFF] w-60 h-60 ' src={item.image} alt="" />
//                         <div className='p-4'>
//                             <div className={`flex items-center gap-2 text-sm text-center ${item.available ? 'text-green-500' : "text-red-500"}`}>
//                                 <p className={`w-2 h-2 rounded-full ${item.available ? 'bg-green-500' : "bg-red-500"}`}></p><p>{item.available ? 'Available' : "Not Available"}</p>
//                             </div>
//                             <p className='text-[#262626] text-lg font-medium'>{item.name}</p>
//                             <p className='text-[#5C5C5C] text-sm'>{item.speciality}</p>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//             {/* <button className='bg-[#EAEFFF] text-gray-600 px-12 py-3 rounded-full mt-10'>more</button> */}
//         </div>
//     )
// }

// export default RelatedDoctors