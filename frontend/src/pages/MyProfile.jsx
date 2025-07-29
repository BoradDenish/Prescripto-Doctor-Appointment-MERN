import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import axiosInstance from '../api/axiosInstance';
import { toast } from 'react-toastify'
import { assets } from '../assets/assets'

const MyProfile = () => {

    const [isEdit, setIsEdit] = useState(false)
    const [image, setImage] = useState(false)

    const { token, backendUrl, userData, setUserData, loadUserProfileData } = useContext(AppContext)

    // Function to update user profile data using API
    const updateUserProfileData = async () => {
        try {
            const formData = new FormData();

            formData.append('name', userData.name)
            formData.append('phone', userData.phone)
            formData.append('address', JSON.stringify(userData.address))
            formData.append('gender', userData.gender)
            formData.append('dob', userData.dob)

            image && formData.append('image', image)

            const { data } = await axiosInstance.post(backendUrl + '/api/user/update-profile', formData, { headers: { token } })

            if (data.success) {
                toast.success(data.message)
                await loadUserProfileData()
                setIsEdit(false)
                setImage(false)
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    return userData ? (
        <div className="max-w-lg flex flex-col gap-6 px-6 py-8 bg-white shadow-lg rounded-lg border border-gray-200">

            {/* Edit Button placed at the top */}
            <div className="flex justify-end mb-4">
                {isEdit
                    ? <button
                        onClick={updateUserProfileData}
                        className="bg-primary text-white px-6 py-2 rounded-md hover:bg-primary-dark transition-all"
                    >
                        Save Information
                    </button>
                    : <button
                        onClick={() => setIsEdit(true)}
                        className="border border-primary text-primary px-6 py-2 rounded-md hover:bg-primary hover:text-white transition-all"
                    >
                        Edit
                    </button>
                }
            </div>

            {/* Profile Image Section */}
            <div className="flex justify-center">
                {isEdit
                    ? <label htmlFor='image'>
                        <div className='relative cursor-pointer'>
                            <img
                                className='w-36 h-36 rounded-full object-cover transition-all duration-300 hover:opacity-80'
                                src={image ? URL.createObjectURL(image) : userData.image}
                                alt="Profile"
                            />
                            <img
                                className='w-10 absolute bottom-0 right-0 bg-white p-2 rounded-full shadow-lg'
                                src={image ? '' : assets.upload_icon}
                                alt="Upload Icon"
                            />
                        </div>
                        <input onChange={(e) => setImage(e.target.files[0])} type="file" id="image" hidden />
                    </label>
                    : <img className='w-36 h-36 rounded-full object-cover' src={userData.image} alt="Profile" />
                }
            </div>

            {/* Name Section */}
            {isEdit
                ? <input
                    className="bg-gray-50 text-2xl font-semibold py-2 px-4 rounded-md focus:ring-2 focus:ring-primary transition-all"
                    type="text"
                    onChange={(e) => setUserData(prev => ({ ...prev, name: e.target.value }))}
                    value={userData.name}
                />
                : <p className="text-2xl font-semibold text-[#262626] mt-4">{userData.name}</p>
            }

            <hr className='bg-[#DDDDDD] h-[1px] my-4' />

            {/* Contact Information */}
            <div>
                <p className='text-[#787878] text-sm font-medium'>CONTACT INFORMATION</p>
                <div className='grid grid-cols-[1fr_3fr] gap-y-2 mt-4'>
                    <p className='font-semibold'>Email id:</p>
                    <p className='text-blue-500'>{userData.email}</p>
                    <p className='font-semibold'>Phone:</p>

                    {isEdit
                        ? <input
                            className='bg-gray-100 py-2 px-4 rounded-md focus:ring-2 focus:ring-primary transition-all'
                            type="text"
                            onChange={(e) => setUserData(prev => ({ ...prev, phone: e.target.value }))} 
                            value={userData.phone}
                        />
                        : <p className='text-gray-500'>{userData.phone}</p>
                    }

                    <p className='font-semibold'>Address:</p>

                    {isEdit
                        ? <p>
                            <input
                                className='bg-gray-100 py-2 px-4 rounded-md focus:ring-2 focus:ring-primary transition-all'
                                type="text"
                                onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line1: e.target.value } }))}
                                value={userData.address.line1}
                            />
                            <br />
                            <input
                                className='bg-gray-100 py-2 px-4 rounded-md focus:ring-2 focus:ring-primary transition-all'
                                type="text"
                                onChange={(e) => setUserData(prev => ({ ...prev, address: { ...prev.address, line2: e.target.value } }))}
                                value={userData.address.line2}
                            />
                        </p>
                        : <p className='text-gray-500'>{userData.address.line1} <br /> {userData.address.line2}</p>
                    }
                </div>
            </div>

            {/* Basic Information */}
            <div>
                <p className='text-[#787878] text-sm font-medium mt-5'>BASIC INFORMATION</p>
                <div className='grid grid-cols-[1fr_3fr] gap-y-2 mt-4'>
                    <p className='font-semibold'>Gender:</p>

                    {isEdit
                        ? <select
                            className="bg-gray-100 py-2 px-4 rounded-md focus:ring-2 focus:ring-primary transition-all"
                            onChange={(e) => setUserData(prev => ({ ...prev, gender: e.target.value }))}
                            value={userData.gender}
                        >
                            <option value="Not Selected">Not Selected</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                        : <p className='text-gray-500'>{userData.gender}</p>
                    }

                    <p className='font-semibold'>Birthday:</p>

                    {isEdit
                        ? <input
                            className='bg-gray-100 py-2 px-4 rounded-md focus:ring-2 focus:ring-primary transition-all'
                            type='date'
                            onChange={(e) => setUserData(prev => ({ ...prev, dob: e.target.value }))} 
                            value={userData.dob}
                        />
                        : <p className='text-gray-500'>{userData.dob}</p>
                    }
                </div>
            </div>

        </div>
    ) : null
}

export default MyProfile
