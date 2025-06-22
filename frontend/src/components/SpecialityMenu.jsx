// import React from 'react'
// import { specialityData } from '../assets/assets'
// import { Link } from 'react-router-dom'

// const SpecialityMenu = () => {
//     return (
//         <div id='speciality' className='flex flex-col items-center gap-4 py-16 text-[#262626]'>
//             <h1 className='text-3xl font-medium'>Find by Speciality</h1>
//             <p className='sm:w-1/3 text-center text-sm'>Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.</p>
//             <div className='flex sm:justify-center gap-4 pt-5 w-full overflow-scroll '>
//                 {specialityData.map((item, index) => (
//                     <Link to={`/doctors/${item.speciality}`} onClick={() => scrollTo(0, 0)} className='flex flex-col items-center text-xs cursor-pointer flex-shrink-0 hover:translate-y-[-10px] transition-all duration-500' key={index}>
//                         <img className='w-16 sm:w-24 mb-2 ' src={item.image} alt="" />
//                         <p>{item.speciality}</p>
//                     </Link>
//                 ))}
//             </div>
//         </div>
//     )
// }

// export default SpecialityMenu

import React from 'react'
import { specialityData } from '../assets/assets'
import { Link } from 'react-router-dom'

const SpecialityMenu = () => {
    return (
        <div id="speciality" className="flex flex-col items-center gap-6 py-16 text-[#262626] ">
            <h1 className="text-4xl font-semibold text-[#1a1a1a] leading-snug">Find Doctors by Specialty</h1>
            <p className="sm:w-1/2 text-center text-sm text-[#555] mb-8">
                Simply browse through our extensive list of trusted doctors and schedule your appointment with ease.
            </p>
            <div className="flex sm:justify-center gap-8 pt-5 w-full overflow-x-scroll">
                {specialityData.map((item, index) => (
                    <Link
                        to={`/doctors/${item.speciality}`}
                        onClick={() => scrollTo(0, 0)}
                        className="flex flex-col items-center text-sm cursor-pointer flex-shrink-0 transition-all duration-500 transform hover:scale-105 hover:shadow-sm"
                        key={index}
                    >
                        <img
                            className="w-20 sm:w-28 mb-3 transition-transform duration-300 transform hover:scale-110"
                            src={item.image}
                            alt={item.speciality}
                        />
                        <p className="text-base font-medium text-[#333]">{item.speciality}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default SpecialityMenu;
