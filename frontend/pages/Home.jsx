

import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
axios.defaults.baseURL='http://localhost:8081';

function Home() {
    const [data, setData] = useState([]);
    const [deleted, setDeleted] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (deleted) {
          setDeleted(false);
      
          axios.get('/students')
            .then((res) => {
              console.log("Fetched student data:", res.data);
              if (Array.isArray(res.data)) {
                setData(res.data);
              } else {
                console.warn("Expected an array but got:", typeof res.data);
                setData([]);
              }
            })
            .catch((err) => {
              console.log("Fetch error:", err);
              setData([]);
            });
        }
      }, [deleted]);
      
    // Fixed: Added missing handleAction function
    function handleAction(action, studentId) {
        switch(action) {
            case 'create':
                navigate('/create');
                break;
            case 'read':
                navigate(`/read/${studentId}`);
                break;
            case 'edit':
                navigate(`/edit/${studentId}`);
                break;
            case 'audit':
                navigate('/audit-trail');
                break;
            default:
                console.log('Unknown action:', action);
        }
    }

    function handleDelete(studentId) {
        axios.delete(`/delete/${studentId}`)
            .then(() => {
                setDeleted(true);
            })
            .catch((err) => console.log(err));
    }
    return (
        <div className="min-h-screen" style={{ backgroundColor: '#FBF5DE' }}>
            <div className="container mx-auto px-6 py-8">
                {/* Header Section */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-800 mb-2">Student Management</h1>
                    <p className="text-gray-600">Manage student records and enrollment data</p>
                </div>

                {/* Action Buttons */}
                <div className="mb-6 flex gap-4">
                    <button 
                        onClick={() => handleAction('create', null)}
                        className="px-6 py-3 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
                        style={{ backgroundColor: '#3D74B6' }}
                    >
                        + Add New Student
                    </button>
                    <button 
                        onClick={() => handleAction('audit', null)}
                        className="px-6 py-3 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
                        style={{ backgroundColor: '#DC3C22' }}
                    >
                        📋 Audit Trail
                    </button>
                </div>

                {/* Students Table */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead style={{ backgroundColor: '#EAC8A6' }}>
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800 uppercase tracking-wider">
                                        Student ID
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800 uppercase tracking-wider">
                                        First Name
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800 uppercase tracking-wider">
                                        Last Name
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800 uppercase tracking-wider">
                                        Email
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800 uppercase tracking-wider">
                                        Degree Program
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800 uppercase tracking-wider">
                                        Enrolled Courses
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {Array.isArray(data) && data.length > 0 ? (
                                    data.map((student, index) => (
                                        <tr key={student.studentId} className={`hover:bg-gray-50 transition-colors duration-150 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {student.studentId}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                                {student.firstName}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                                {student.lastName}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                                {student.emailAddress}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                                {student.degreeProgram}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-gray-700">
                                                <div className="flex flex-wrap gap-1">
                                                    {(student.enrolledCourses || []).map((course, idx) => (
                                                        <span 
                                                            key={idx}
                                                            className="px-2 py-1 text-xs rounded-full text-gray-700"
                                                            style={{ backgroundColor: '#FBF5DE' }}
                                                        >
                                                            {course}
                                                        </span>
                                                    ))}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                                                <button
                                                    onClick={() => handleAction('read', student.studentId)}
                                                    className="px-3 py-1 text-white text-xs font-medium rounded hover:shadow-md transition-shadow duration-150"
                                                    style={{ backgroundColor: '#3D74B6' }}
                                                >
                                                    View
                                                </button>
                                                <button
                                                    onClick={() => handleAction('edit', student.studentId)}
                                                    className="px-3 py-1 text-gray-800 text-xs font-medium rounded hover:shadow-md transition-shadow duration-150"
                                                    style={{ backgroundColor: '#EAC8A6' }}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(student.studentId)}
                                                    className="px-3 py-1 text-white text-xs font-medium rounded hover:shadow-md transition-shadow duration-150"
                                                    style={{ backgroundColor: '#DC3C22' }}
                                                >
                                                    Delete
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="px-6 py-12 text-center text-gray-500">
                                            <div className="flex flex-col items-center">
                                                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#EAC8A6' }}>
                                                    <span className="text-2xl">📚</span>
                                                </div>
                                                <p className="text-lg font-medium">No student data available</p>
                                                <p className="text-sm text-gray-400 mt-1">Add your first student to get started</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Footer Stats */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white rounded-lg p-6 shadow-md">
                        <div className="flex items-center">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center mr-3" style={{ backgroundColor: '#3D74B6' }}>
                                <span className="text-white text-sm font-bold">👥</span>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Total Students</p>
                                <p className="text-2xl font-bold text-gray-800">{data.length}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-white rounded-lg p-6 shadow-md">
                        <div className="flex items-center">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center mr-3" style={{ backgroundColor: '#EAC8A6' }}>
                                <span className="text-gray-800 text-sm font-bold">🎓</span>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Active Programs</p>
                                <p className="text-2xl font-bold text-gray-800">{new Set(data.map(s => s.degreeProgram)).size}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg p-6 shadow-md">
                        <div className="flex items-center">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center mr-3" style={{ backgroundColor: '#DC3C22' }}>
                                <span className="text-white text-sm font-bold">📖</span>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Total Enrollments</p>
                                <p className="text-2xl font-bold text-gray-800">{data.reduce((total, student) => total + (student.enrolledCourses?.length || 0), 0)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;