import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8081';

function Login() {
  const [values, setValues] = useState({
    userName: '',
    password: ''
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleInput = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const validate = (inputs) => {
    const errors = {};
    if (!inputs.userName.trim()) {
      errors.userName = 'Username is required';
    }
    if (!inputs.password.trim()) {
      errors.password = 'Password is required';
    }
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      const cleanedValues = {
        userName: values.userName.trim().replace(/^"|"$/g, ''),
        password: values.password.trim().replace(/^"|"$/g, '')
      };

      console.log('Login attempt with:', cleanedValues);

      axios.post('/login', cleanedValues)
        .then(res => {
          console.log('Login response:', res.data);
          if (res.data.message === 'Success') {
            navigate('/home');
          } else {
            alert(res.data.message);
          }
        })
        .catch(err => {
          console.error('Login error details:', {
            message: err.message,
            response: err.response?.data,
            status: err.response?.status
          });
          alert('Login failed. Please check your credentials and try again.');
        });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen" style={{ backgroundColor: '#FBF5DE' }}>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded shadow-md w-full max-w-md border-2"
        style={{ borderColor: '#EAC8A6' }}
      >
        <h2 className="text-2xl font-bold mb-6 text-center" style={{ color: '#3D74B6' }}>
          Admin Login
        </h2>
        
        <div className="mb-4">
          <label className="block mb-1 font-medium" style={{ color: '#3D74B6' }}>
            Username
          </label>
          <input
            type="text"
            name="userName"
            value={values.userName}
            onChange={handleInput}
            className="w-full px-4 py-2 border-2 rounded focus:outline-none transition-colors duration-200"
            style={{ borderColor: '#EAC8A6' }}
            onFocus={(e) => e.target.style.borderColor = '#3D74B6'}
            onBlur={(e) => e.target.style.borderColor = '#EAC8A6'}
          />
          {errors.userName && (
            <p className="text-sm mt-1 font-medium" style={{ color: '#DC3C22' }}>
              {errors.userName}
            </p>
          )}
        </div>
        
        <div className="mb-6">
          <label className="block mb-1 font-medium" style={{ color: '#3D74B6' }}>
            Password
          </label>
          <input
            type="password"
            name="password"
            value={values.password}
            onChange={handleInput}
            className="w-full px-4 py-2 border-2 rounded focus:outline-none transition-colors duration-200"
            style={{ borderColor: '#EAC8A6' }}
            onFocus={(e) => e.target.style.borderColor = '#3D74B6'}
            onBlur={(e) => e.target.style.borderColor = '#EAC8A6'}
          />
          {errors.password && (
            <p className="text-sm mt-1 font-medium" style={{ color: '#DC3C22' }}>
              {errors.password}
            </p>
          )}
        </div>
        
        <button
          type="submit"
          className="w-full text-white font-semibold py-3 rounded transition-all duration-200 hover:opacity-90 hover:shadow-lg"
          style={{ backgroundColor: '#3D74B6' }}
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;