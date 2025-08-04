import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
axios.defaults.baseURL = 'http://localhost:8081';

function Edit() {
  const [data, setData] = useState(null);
  const { studentId } = useParams();

  useEffect(() => {
    axios.get(`/get_student/${studentId}`)
      .then(res => {
        console.log("Raw response:", res.data);
        
        // Handle both array and object responses
        const student = Array.isArray(res.data) ? res.data[0] : res.data;
        
        // Handle enrolledCourses - it might be a string or already an array
        if (student.enrolledCourses) {
          if (typeof student.enrolledCourses === 'string') {
            student.enrolledCourses = student.enrolledCourses.split(',').map(c => c.trim());
          }
          // If it's already an array, leave it as is
        } else {
          student.enrolledCourses = [];
        }
        
        console.log("Processed student data:", student);
        setData(student);
      })
      .catch(err => console.log(err));
  }, [studentId]);
  

  const navigate = useNavigate();
  
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setData(prev => ({
        ...prev,
        enrolledCourses: [...(prev.enrolledCourses || []), value]
      }));
    } else {
      setData(prev => ({
        ...prev,
        enrolledCourses: (prev.enrolledCourses || []).filter(c => c !== value)
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log("Submitting data:", data);
    
    axios.post(`/edit_student/${studentId}`, data)
      .then(response => {
        console.log("Update response:", response.data);
        navigate('/home');
      })
      .catch(err => {
        console.log("Update error:", err);
        console.log("Error response:", err.response?.data);
      });
  };

  // Show loading state if data is not yet loaded
  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-yellow-50">
        <div className="text-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Loading Student Data...</h3>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FBF5DE' }}>
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-4">Edit Student - {studentId}</h1>
            <Link to="/home" className="inline-flex items-center px-4 py-2 text-white font-medium rounded-lg" style={{ backgroundColor: '#3D74B6' }}>← Back to Home</Link>
          </div>
          
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg p-8 space-y-6">
            <div className="pb-6 border-b border-gray-200">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <input 
                    type="text" 
                    value={data.firstName || ''} 
                    onChange={e => setData({ ...data, firstName: e.target.value })} 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg" 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <input 
                    type="text" 
                    value={data.lastName || ''} 
                    onChange={e => setData({ ...data, lastName: e.target.value })} 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg" 
                    required 
                  />
                </div>
              </div>
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Home Address</label>
                <input 
                  type="text" 
                  value={data.homeAddress || ''} 
                  onChange={e => setData({ ...data, homeAddress: e.target.value })} 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg" 
                  required 
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input 
                    type="email" 
                    value={data.emailAddress || ''} 
                    onChange={e => setData({ ...data, emailAddress: e.target.value })} 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg" 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <input 
                    type="tel" 
                    value={data.phoneNumber || ''} 
                    onChange={e => setData({ ...data, phoneNumber: e.target.value })} 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg" 
                    required 
                  />
                </div>
              </div>
              <div className="mt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Birthday</label>
                <input 
                  type="date" 
                  value={data.birthday || ''} 
                  onChange={e => setData({ ...data, birthday: e.target.value })} 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg" 
                  required 
                />
              </div>
            </div>

            <div className="pb-6 border-b border-gray-200">
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Academic Information</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Student ID</label>
                  <input 
                    type="text" 
                    value={data.studentId || ''} 
                    readOnly 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-100 text-gray-600" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Degree Program</label>
                  <select 
                    value={data.degreeProgram || ''} 
                    onChange={e => setData({ ...data, degreeProgram: e.target.value })} 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg" 
                    required
                  >
                    <option value="">Select Program</option>
                    <option value="cs">Computer Science</option>
                    <option value="it">Information Technology</option>
                    <option value="se">Software Engineering</option>
                    <option value="ds">Data Science</option>
                  </select>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-gray-800 mb-4">Enrolled Courses</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['java', 'python', 'figma', 'ethicalHacking', 'graphicDesign', 'uxDesign'].map(course => (
                  <label key={course} className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      value={course}
                      checked={data.enrolledCourses?.includes(course) || false}
                      onChange={handleCheckboxChange}
                      className="w-5 h-5 rounded border-2 border-gray-300 text-blue-600"
                      style={{ accentColor: '#3D74B6' }}
                    />
                    <span className="text-gray-700">{course.replace(/([A-Z])/g, ' $1')}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="pt-6">
              <button type="submit" className="w-full px-6 py-4 text-white font-semibold text-lg rounded-lg shadow-md" style={{ backgroundColor: '#DC3C22' }}>
                Save Changes
              </button>
            </div>
          </form> 
        </div>
      </div>
    </div>
  );
}

export default Edit;