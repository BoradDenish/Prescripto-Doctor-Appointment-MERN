// import React, { useContext, useEffect } from 'react';
// import { DoctorContext } from './context/DoctorContext';
// import { AdminContext } from './context/AdminContext';
// import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// // Components
// import Navbar from './components/Navbar';
// import Sidebar from './components/Sidebar';

// // Admin Pages
// import Dashboard from './pages/Admin/Dashboard';
// import AllAppointments from './pages/Admin/AllAppointments';
// import AddDoctor from './pages/Admin/AddDoctor';
// import DoctorsList from './pages/Admin/DoctorsList';

// // Doctor Pages
// import DoctorDashboard from './pages/Doctor/DoctorDashboard';
// import DoctorAppointments from './pages/Doctor/DoctorAppointments';
// import DoctorProfile from './pages/Doctor/DoctorProfile';
// import PrescriptionsPage from './pages/Doctor/prescriptions';
// import PrescriptionsList from './pages/Doctor/PrescriptionList';

// // Auth Pages
// import Login from './pages/Login';

// const App = () => {
//   const { dToken, setDToken } = useContext(DoctorContext);
//   const { aToken, setAToken } = useContext(AdminContext);

//   // Logout function to clear tokens and redirect
//   const logout = () => {
//     setDToken(null);
//     setAToken(null);
//     localStorage.removeItem('dToken');
//     localStorage.removeItem('aToken');
//   };

//   // Check token validity on initial load (for example, check expiration)
//   useEffect(() => {
//     // You can also implement a check for token expiry here
//     if (!dToken && !aToken) {
//       logout();
//     }
//   }, [dToken, aToken]);

//   return (
//     <Router>
//       {dToken || aToken ? (
//         <div className='bg-[#F8F9FD]'>
//           <ToastContainer />
//           <Navbar />
//           <div className='flex items-start'>
//             <Sidebar />
//             <Routes>
//               {/* Admin Routes */}
//               {aToken && (
//                 <>
//                   <Route path='/admin-dashboard' element={<Dashboard />} />
//                   <Route path='/all-appointments' element={<AllAppointments />} />
//                   <Route path='/add-doctor' element={<AddDoctor />} />
//                   <Route path='/doctor-list' element={<DoctorsList />} />
//                 </>
//               )}

//               {/* Doctor Routes */}
//               {dToken && (
//                 <>
//                   <Route path='/doctor-dashboard' element={<DoctorDashboard />} />
//                   <Route path='/doctor-appointments' element={<DoctorAppointments />} />
//                   <Route path='/doctor-profile' element={<DoctorProfile />} />
//                   <Route path='/prescriptions' element={<PrescriptionsPage />} />
//                   <Route path='/list-prescriptions' element={<PrescriptionsList />} />
//                 </>
//               )}

//               {/* Default Route */}
//               <Route path='/' element={<></>} />
//             </Routes>
//           </div>
//         </div>
//       ) : (
//         <>
//           <ToastContainer />
//           <Login />
//         </>
//       )}
//     </Router>
//   );
// };

// export default App;




import { useContext } from 'react'
import { DoctorContext } from './context/DoctorContext';
import { AdminContext } from './context/AdminContext';
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Admin/Dashboard';
import AllAppointments from './pages/Admin/AllAppointments';
import AddDoctor from './pages/Admin/AddDoctor';
import DoctorsList from './pages/Admin/DoctorsList';
import Login from './pages/Login';
import DoctorAppointments from './pages/Doctor/DoctorAppointments';
import DoctorDashboard from './pages/Doctor/DoctorDashboard';
import DoctorProfile from './pages/Doctor/DoctorProfile';
import PrescriptionsPage from './pages/Doctor/prescriptions';
import PrescriptionsList from './pages/Doctor/PrescriptionList';

const App = () => {

  const { dToken } = useContext(DoctorContext)
  const { aToken } = useContext(AdminContext)

  return dToken || aToken ? (
    <div className='bg-[#F8F9FD]'>
      <ToastContainer />
      <Navbar />
      <div className='flex items-start'>
        <Sidebar />
        <Routes>
          <Route path='/' element={<></>} />
          <Route path='/admin-dashboard' element={<Dashboard />} />
          <Route path='/all-appointments' element={<AllAppointments />} />
          <Route path='/add-doctor' element={<AddDoctor />} />
          <Route path='/doctor-list' element={<DoctorsList />} />
          <Route path='/doctor-dashboard' element={<DoctorDashboard />} />
          <Route path='/doctor-appointments' element={<DoctorAppointments />} />
          <Route path='/doctor-profile' element={<DoctorProfile />} />
          <Route path='/prescriptions' element={<PrescriptionsPage />} />
          <Route path='/list-prescriptions' element={<PrescriptionsList />} />
          <Route path="/prescriptions/:appointmentId" element={<PrescriptionsPage />} />
        </Routes>
      </div>
    </div>
  ) : (
    <>
      <ToastContainer />
      <Login />
    </>
  )
}

export default App