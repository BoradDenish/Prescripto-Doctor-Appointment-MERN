import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axiosInstance from '../api/axiosInstance';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [state, setState] = useState('Sign Up');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { backendUrl, token, setToken } = useContext(AppContext);

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      if (state === 'Sign Up') {
        const { data } = await axiosInstance.post(backendUrl + '/api/user/register', { name, email, password });

        if (data.success) {
          localStorage.setItem('token', data.token);
          setToken(data.token);
          navigate('/');
        } else {
          toast.error(data.message);
        }
      } else {
        const { data } = await axiosInstance.post(backendUrl + '/api/user/login', { email, password });

        if (data.success) {
          localStorage.setItem('token', data.token);
          setToken(data.token);
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [navigate, token]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-100 to-green-100">
      <div className="flex w-full max-w-6xl bg-white rounded-lg shadow-xl overflow-hidden">
        {/* Left Section with Image */}
        <div className="w-1/2 bg-cover bg-center" style={{ backgroundImage: 'url(https://via.placeholder.com/600x400?text=Healthcare+Image)' }}>
          <div className="flex items-center justify-center h-full bg-opacity-50 bg-blue-500 text-white text-center p-8">
            <div>
              <h1 className="text-4xl font-bold mb-4">Welcome to Mediconnect</h1>
              <p className="text-lg">Your health, our priority. Access appointments, records, and more.</p>
            </div>
          </div>
        </div>

        {/* Right Section with Form */}
        <div className="w-1/2 p-8">
          <form onSubmit={onSubmitHandler}>
            <div className="text-center mb-6">
              <p className="text-3xl font-bold text-blue-700">{state === 'Sign Up' ? 'Create Your Account' : 'Welcome Back'}</p>
              <p className="text-sm text-gray-600">Please {state === 'Sign Up' ? 'sign up' : 'log in'} to access your health records and appointments.</p>
            </div>

            {state === 'Sign Up' && (
              <div className="w-full mb-4">
                <label htmlFor="name" className="block text-sm text-gray-700">Full Name</label>
                <input
                  id="name"
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  type="text"
                  required
                />
              </div>
            )}

            <div className="w-full mb-4">
              <label htmlFor="email" className="block text-sm text-gray-700">Email</label>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <span className="px-4 text-gray-600"><i className="fas fa-envelope"></i></span>
                <input
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  className="w-full p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  type="email"
                  required
                />
              </div>
            </div>

            <div className="w-full mb-6">
              <label htmlFor="password" className="block text-sm text-gray-700">Password</label>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <span className="px-4 text-gray-600"><i className="fas fa-lock"></i></span>
                <input
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  className="w-full p-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  type="password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full p-3 bg-gradient-to-r from-blue-500 to-green-500 text-white font-semibold rounded-lg shadow-md hover:from-blue-600 hover:to-green-600 transition duration-300 ease-in-out"
              disabled={loading}
            >
              {loading ? 'Processing...' : state === 'Sign Up' ? 'Create Account' : 'Login'}
            </button>

            <div className="mt-4 text-center">
              {state === 'Sign Up' ? (
                <p className="text-sm text-gray-600">
                  Already have an account?{' '}
                  <span
                    onClick={() => setState('Login')}
                    className="text-blue-600 cursor-pointer hover:underline"
                  >
                    Login here
                  </span>
                </p>
              ) : (
                <p className="text-sm text-gray-600">
                  Don't have an account?{' '}
                  <span
                    onClick={() => setState('Sign Up')}
                    className="text-blue-600 cursor-pointer hover:underline"
                  >
                    Sign up here
                  </span>
                </p>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
