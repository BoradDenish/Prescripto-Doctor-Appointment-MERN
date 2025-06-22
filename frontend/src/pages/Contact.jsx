import React from 'react'
import { assets } from '../assets/assets'

const Contact = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      {/* Contact Header */}
      <div className="text-center text-3xl font-semibold text-gray-700 pt-10 mb-12">
        <p><span className="text-black">CONTACT US</span></p>
      </div>

      {/* Contact Section */}
      <div className="flex flex-col gap-10 md:flex-row items-center justify-between">
        {/* Left Side Image */}
        <div className="w-full md:w-[400px] lg:w-[450px]">
          <img className=" rounded-lg shadow-lg object-cover" src={assets.contact_image} alt="Contact Us" />
        </div>

        {/* Right Side Contact Information */}
        <div className="flex flex-col gap-8 md:w-1/2 text-sm text-gray-600">
          {/* Office Information */}
          <div>
            <p className="font-semibold text-2xl text-gray-700">OUR OFFICE</p>
            <p className="text-gray-500 ">
              54709 Willms Station <br />
              Suite 328, Ahmedabad, GUJRAT
            </p>
            <p className="text-gray-500">
              Tel: (415) 555-0132 <br />
              Email: <a href="mailto:medeconnect@medi.com" className="text-primary">medeconnect@medi.com</a>
            </p>
          </div>

          {/* Careers Section */}
          <div>
            <p className="font-semibold text-xl text-gray-700">CAREERS AT MEDICONNECT</p>
            <p className="text-gray-500">
              Learn more about our teams and job openings.
            </p>
            <button className="border border-primary px-8 py-3 text-sm text-primary font-semibold hover:bg-primary hover:text-white transition-all duration-500 rounded-md mt-4">
              Explore Jobs
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact


// import React from 'react'
// import { assets } from '../assets/assets'

// const Contact = () => {
//   return (
//     <div>

//       <div className='text-center text-2xl pt-10 text-[#707070]'>
//         <p><span className='text-gray-700 font-semibold'>CONTACT US</span></p>
//       </div>

//       <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm'>
//         <img className='w-full md:max-w-[360px]' src={assets.contact_image} alt="" />
//         <div className='flex flex-col justify-center items-start gap-6'>
//           <p className=' font-semibold text-lg text-gray-600'>OUR OFFICE</p>
//           <p className=' text-gray-500'>54709 Willms Station <br /> Suite 328, Ahmedabad, GUJRAT</p>
//           <p className=' text-gray-500'>Tel: (415) 555-0132 <br /> Email: medeconnect@medi.com</p>
//           <p className=' font-semibold text-lg text-gray-600'>CAREERS AT MEDICONNECT</p>
//           <p className=' text-gray-500'>Learn more about our teams and job openings.</p>
//           <button className='border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500'>Explore Jobs</button>
//         </div>
//       </div>

//     </div>
//   )
// }

// export default Contact
