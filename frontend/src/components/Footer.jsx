import React from 'react';
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <div className="md:mx-10 font-sans">
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">

        <div>
          <img className="mb-5 w-40" src={assets.logo} alt="Company Logo" />
          <p className="w-full md:w-2/3 text-gray-700 leading-7 font-light">
            Our platform simplifies the appointment booking process for patients, allowing them to easily schedule, reschedule, and manage appointments with healthcare providers. With just a few clicks, patients can access real-time availability and book appointments at their convenience, saving time and enhancing the overall healthcare experience.
          </p>
        </div>

        <div>
          <p className="text-2xl font-semibold mb-5 text-gray-800 tracking-wide">COMPANY</p>
          <ul className="flex flex-col gap-2 text-gray-600 font-medium">
            <li className="hover:text-blue-600 cursor-pointer">Home</li>
            <li className="hover:text-blue-600 cursor-pointer">About us</li>
            <li className="hover:text-blue-600 cursor-pointer">Delivery</li>
            <li className="hover:text-blue-600 cursor-pointer">Privacy policy</li>
          </ul>
        </div>

        <div>
          <p className="text-2xl font-semibold mb-5 text-gray-800 tracking-wide">GET IN TOUCH</p>
          <ul className="flex flex-col gap-2 text-gray-600 font-medium">
            <li className="hover:text-blue-600 cursor-pointer">+1-212-456-7890</li>
            <li className="hover:text-blue-600 cursor-pointer">mediconnect@medi.ac.in</li>
          </ul>
        </div>

      </div>

      <div>
        <hr className="border-gray-300" />
        <p className="py-5 text-sm text-center text-gray-600 font-light">
          Copyright 2025 @ Mediconnect.com - All Right Reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
