import axios from 'axios'
import { useContext, useState } from 'react'
import { DoctorContext } from '../context/DoctorContext'
import { AdminContext } from '../context/AdminContext'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [state, setState] = useState('Admin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000"
  const { setDToken } = useContext(DoctorContext)
  const { setAToken } = useContext(AdminContext)

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (state === 'Admin') {
        const { data } = await axios.post(backendUrl + '/api/admin/login', { email, password })
        if (data.success) {
          setAToken(data.token)
          localStorage.setItem('aToken', data.token)
          navigate('/admin-dashboard');
        } else {
          toast.error(data.message)
        }
      } else {
        const { data } = await axios.post(backendUrl + '/api/doctor/login', { email, password })
        if (data.success) {
          setDToken(data.token)
          localStorage.setItem('dToken', data.token)
          navigate('/doctor-dashboard');
        } else {
          toast.error(data.message)
        }
      }
    } catch (err) {
      toast.error("Login failed. Please try again.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F8F9FD] to-[#e0e7ff]">
      <form
        onSubmit={onSubmitHandler}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 flex flex-col gap-6"
      >
        <div className="flex flex-col items-center gap-2 mb-2">
          {/* Logo or Icon */}
          <div className="bg-primary rounded-full w-16 h-16 flex items-center justify-center mb-2">
            <span className="text-white text-3xl font-bold">P</span>
          </div>
          <h1 className="text-2xl font-bold text-primary">Prescripto Login</h1>
          <p className="text-gray-500">{state} Portal</p>
        </div>
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="border border-[#DADADA] rounded-lg w-full p-3 focus:outline-primary transition"
            type="email"
            required
            placeholder="Enter your email"
          />
        </div>
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="border border-[#DADADA] rounded-lg w-full p-3 focus:outline-primary transition"
            type="password"
            required
            placeholder="Enter your password"
          />
        </div>
        <button
          className="bg-primary hover:bg-blue-600 text-white w-full py-3 rounded-lg text-base font-semibold transition"
        >
          Login
        </button>
        <div className="flex justify-between w-full text-sm mt-2">
          <button
            type="button"
            className="text-blue-500 hover:text-blue-700 underline"
            onClick={() => navigate('/register-admin')}
          >
            Register as Admin
          </button>
          <button
            type="button"
            className="text-green-500 hover:text-green-700 underline"
            onClick={() => navigate('/register-doctor')}
          >
            Register as Doctor
          </button>
        </div>
        <div className="w-full text-center mt-2">
          {state === 'Admin' ? (
            <span>
              Doctor Login?{' '}
              <button
                type="button"
                className="text-primary underline font-medium"
                onClick={() => setState('Doctor')}
              >
                Click here
              </button>
            </span>
          ) : (
            <span>
              Admin Login?{' '}
              <button
                type="button"
                className="text-primary underline font-medium"
                onClick={() => setState('Admin')}
              >
                Click here
              </button>
            </span>
          )}
        </div>
      </form>
    </div>
  )
}

export default Login