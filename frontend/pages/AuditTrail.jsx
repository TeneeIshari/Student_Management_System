import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:8081';

function AuditTrail() {
    const [auditData, setAuditData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchAuditData();
    }, []);

    const fetchAuditData = async () => {
        try {
            setLoading(true);
            const response = await axios.get('/audit-trail');
            console.log("Fetched audit data:", response.data);
            
            if (Array.isArray(response.data)) {
                setAuditData(response.data);
            } else {
                console.warn("Expected an array but got:", typeof response.data);
                setAuditData([]);
            }
        } catch (err) {
            console.error("Fetch audit data error:", err);
            setError("Failed to fetch audit trail data");
            setAuditData([]);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });
    };

    const getActionColor = (action) => {
        switch(action?.toLowerCase()) {
            case 'create':
            case 'created':
                return '#28a745'; // Green
            case 'update':
            case 'updated':
            case 'edit':
            case 'edited':
                return '#3D74B6'; // Blue
            case 'delete':
            case 'deleted':
                return '#DC3C22'; // Red
            case 'view':
            case 'viewed':
                return '#6c757d'; // Gray
            case 'login':
                return '#17a2b8'; // Teal
            default:
                return '#EAC8A6'; // Default beige
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen" style={{ backgroundColor: '#FBF5DE' }}>
                <div className="container mx-auto px-6 py-8">
                    <div className="flex justify-center items-center h-64">
                        <div className="text-center">
                            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900 mx-auto mb-4"></div>
                            <p className="text-gray-600">Loading audit trail...</p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen" style={{ backgroundColor: '#FBF5DE' }}>
            <div className="container mx-auto px-6 py-8">
                {/* Header Section */}
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-4xl font-bold text-gray-800 mb-2">Audit Trail</h1>
                            <p className="text-gray-600">Track all system activities and user actions</p>
                        </div>
                        <button
                            onClick={() => navigate('/home')}
                            className="px-6 py-3 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
                            style={{ backgroundColor: '#3D74B6' }}
                        >
                            ← Back to Home
                        </button>
                    </div>
                </div>

        
                {/* Error Message */}
                {error && (
                    <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                        <strong>Error:</strong> {error}
                    </div>
                )}

                {/* Audit Trail Table */}
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead style={{ backgroundColor: '#EAC8A6' }}>
                                <tr>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800 uppercase tracking-wider">
                                        Student ID
                                    </th>
                                
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800 uppercase tracking-wider">
                                        Action
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800 uppercase tracking-wider">
                                        Admin ID
                                    </th>
                                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-800 uppercase tracking-wider">
                                        Timestamp
                                    </th>
                                
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {Array.isArray(auditData) && auditData.length > 0 ? (
                                    auditData.map((record, index) => (
                                        <tr key={record.auditId || index} className={`hover:bg-gray-50 transition-colors duration-150 ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {record.studentId || 'N/A'}
                                            </td>
                                        
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                <span 
                                                    className="px-3 py-1 text-white text-xs font-medium rounded-full uppercase tracking-wide"
                                                    style={{ backgroundColor: getActionColor(record.action) }}
                                                >
                                                    {record.action || 'Unknown'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                                <div className="flex items-center">
                                                    <div className="w-6 h-6 rounded-full flex items-center justify-center mr-2 text-xs font-bold text-white" style={{ backgroundColor: '#DC3C22' }}>
                                                        A
                                                    </div>
                                                    {record.adminId || 'N/A'}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                                                {formatDate(record.timestamp)}
                                            </td>
                                        
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-12 text-center text-gray-500">
                                            <div className="flex flex-col items-center">
                                                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4" style={{ backgroundColor: '#EAC8A6' }}>
                                                    <span className="text-2xl">📋</span>
                                                </div>
                                                <p className="text-lg font-medium">No audit trail data available</p>
                                                <p className="text-sm text-gray-400 mt-1">Activities will appear here once actions are performed</p>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Summary Stats */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="bg-white rounded-lg p-6 shadow-md">
                        <div className="flex items-center">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center mr-3" style={{ backgroundColor: '#3D74B6' }}>
                                <span className="text-white text-sm font-bold">📊</span>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Total Records</p>
                                <p className="text-2xl font-bold text-gray-800">{auditData.length}</p>
                            </div>
                        </div>
                    </div>
                    
                
                    <div className="bg-white rounded-lg p-6 shadow-md">
                        <div className="flex items-center">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center mr-3" style={{ backgroundColor: '#DC3C22' }}>
                                <span className="text-white text-sm font-bold">🔧</span>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Active Admins</p>
                                <p className="text-2xl font-bold text-gray-800">
                                    {new Set(auditData.filter(record => record.adminId).map(record => record.adminId)).size}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-lg p-6 shadow-md">
                        <div className="flex items-center">
                            <div className="w-8 h-8 rounded-lg flex items-center justify-center mr-3" style={{ backgroundColor: '#EAC8A6' }}>
                                <span className="text-gray-800 text-sm font-bold">⚡</span>
                            </div>
                            <div>
                                <p className="text-sm text-gray-600">Recent Actions</p>
                                <p className="text-2xl font-bold text-gray-800">
                                    {auditData.filter(record => {
                                        const createdAt = new Date(record.creatAt);
                                        const now = new Date();
                                        const daysDiff = (now - createdAt) / (1000 * 60 * 60 * 24);
                                        return daysDiff <= 7;
                                    }).length}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AuditTrail;