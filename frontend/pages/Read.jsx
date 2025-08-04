
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:8081';

function Read() {
    const [data, setData] = useState([]);
    const params = useParams(); 
    const { studentId } = useParams(); 
    
    useEffect(() => {
        console.log("Making request to:", `/get_student/${studentId}`);
        
        // Don't make request if studentId is empty
        if (!studentId || studentId.trim() === '') {
            console.log("StudentId is empty, not making request");
            return;
        }
        
        axios.get(`/get_student/${studentId}`)
            .then((res) => {
                console.log("Response from server:", res.data);
                console.log("Response type:", typeof res.data);
                console.log("Response is array:", Array.isArray(res.data));
                setData(res.data);
            })
            .catch((err) => {
                console.log("Fetch error:", err);
                console.log("Error response:", err.response?.data);
            });
    }, [studentId]);
    

    return (
        <div className="min-h-screen" style={{ backgroundColor: '#FBF5DE' }}>
            <div className="container mx-auto px-6 py-8">
                <div className="max-w-4xl mx-auto">
                    {/* Header Section */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-800 mb-4">Student Details - {studentId}</h1>
                        <Link 
                            to='/home' 
                            className="inline-flex items-center px-4 py-2 text-white font-medium rounded-lg hover:shadow-md transition-shadow duration-200"
                            style={{ backgroundColor: '#3D74B6' }}
                        >
                            ← Back to Home
                        </Link>
                    </div>

                    {/* Student Information Cards */}
                    <div className="space-y-6">
                        {data && data.length > 0 ? (
                            data.map((student, index) => {
                                // Convert enrolledCourses to array if it's a string
                                const courses = typeof student.enrolledCourses === 'string'
                                    ? student.enrolledCourses.split(',').map(course => course.trim())
                                    : student.enrolledCourses;

                                return (
                                    <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                                        {/* Student Profile Header */}
                                        <div className="px-8 py-6" style={{ backgroundColor: '#EAC8A6' }}>
                                            <div className="flex items-center space-x-4">
                                                <div className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold" style={{ backgroundColor: '#3D74B6' }}>
                                                    {student.firstName?.[0]}{student.lastName?.[0]}
                                                </div>
                                                <div>
                                                    <h2 className="text-2xl font-bold text-gray-800">
                                                        {student.firstName} {student.lastName}
                                                    </h2>
                                                    <p className="text-gray-600">Student ID: {student.studentId}</p>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Student Details */}
                                        <div className="px-8 py-6">
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                {/* Personal Information */}
                                                <div className="space-y-4">
                                                    <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b-2" style={{ borderColor: '#3D74B6' }}>
                                                        Personal Information
                                                    </h3>
                                                    
                                                    <div className="space-y-3">
                                                        <div className="flex items-start">
                                                            <span className="text-sm font-medium text-gray-600 w-24 flex-shrink-0">Name:</span>
                                                            <span className="text-gray-800">{student.firstName} {student.lastName}</span>
                                                        </div>
                                                        
                                                        <div className="flex items-start">
                                                            <span className="text-sm font-medium text-gray-600 w-24 flex-shrink-0">Email:</span>
                                                            <span className="text-gray-800">{student.emailAddress}</span>
                                                        </div>
                                                        
                                                        <div className="flex items-start">
                                                            <span className="text-sm font-medium text-gray-600 w-24 flex-shrink-0">Phone:</span>
                                                            <span className="text-gray-800">{student.phoneNumber}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Academic Information */}
                                                <div className="space-y-4">
                                                    <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b-2" style={{ borderColor: '#DC3C22' }}>
                                                        Academic Information
                                                    </h3>
                                                    
                                                    <div className="space-y-3">
                                                        <div className="flex items-start">
                                                            <span className="text-sm font-medium text-gray-600 w-32 flex-shrink-0">Student ID:</span>
                                                            <span className="px-3 py-1 text-sm font-medium rounded-full text-gray-800" style={{ backgroundColor: '#FBF5DE' }}>
                                                                {student.studentId}
                                                            </span>
                                                        </div>
                                                        
                                                        <div className="flex items-start">
                                                            <span className="text-sm font-medium text-gray-600 w-32 flex-shrink-0">Degree Program:</span>
                                                            <span className="px-3 py-1 text-sm font-medium rounded-full text-white" style={{ backgroundColor: '#3D74B6' }}>
                                                                {student.degreeProgram}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Enrolled Courses Section */}
                                            <div className="mt-8">
                                                <h3 className="text-lg font-semibold text-gray-800 mb-4 pb-2 border-b-2" style={{ borderColor: '#EAC8A6' }}>
                                                    Enrolled Courses
                                                </h3>
                                                
                                                <div className="flex flex-wrap gap-2">
                                                    {courses && courses.length > 0 ? (
                                                        courses.map((course, courseIndex) => (
                                                            <span 
                                                                key={courseIndex}
                                                                className="px-3 py-2 text-sm font-medium rounded-lg text-gray-800 border-2"
                                                                style={{ 
                                                                    backgroundColor: '#EAC8A6',
                                                                    borderColor: '#DC3C22'
                                                                }}
                                                            >
                                                                {course}
                                                            </span>
                                                        ))
                                                    ) : (
                                                        <span className="text-gray-500 italic">No courses enrolled</span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="px-8 py-6 bg-gray-50 border-t border-gray-200">
                                            <div className="flex space-x-4">
                                                <Link 
                                                    to={`/edit/${student.studentId}`}
                                                    className="px-6 py-2 text-gray-800 font-medium rounded-lg hover:shadow-md transition-shadow duration-200"
                                                    style={{ backgroundColor: '#EAC8A6' }}
                                                >
                                                    Edit Student
                                                </Link>
                                                <button 
                                                    className="px-6 py-2 text-white font-medium rounded-lg hover:shadow-md transition-shadow duration-200"
                                                    style={{ backgroundColor: '#DC3C22' }}
                                                    onClick={() => console.log('Delete student:', student.studentId)}
                                                >
                                                    Delete Student
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            /* Empty State */
                            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: '#EAC8A6' }}>
                                    <span className="text-3xl">👤</span>
                                </div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">No Student Found</h3>
                                <p className="text-gray-600 mb-6">The student you're looking for doesn't exist or there was an error loading the data.</p>
                                <p className="text-sm text-gray-500 mb-4">Searched for ID: {studentId}</p>
                                <Link 
                                    to='/home' 
                                    className="inline-flex items-center px-6 py-3 text-white font-medium rounded-lg hover:shadow-md transition-shadow duration-200"
                                    style={{ backgroundColor: '#3D74B6' }}
                                >
                                    Back to Students List
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Read;