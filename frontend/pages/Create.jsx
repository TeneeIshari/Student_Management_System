// import React, {useState, useEffect} from 'react'
// import axios from 'axios';
// import {Link, useNavigate} from 'react-router-dom'
// axios.defaults.baseURL = 'http://localhost:8081';

// function Create(){
//     const navigate = useNavigate()
//     const [values, setValues] = useState({
//         firstName: '',
//         lastName: '',
//         homeAddress: '',
//         emailAddress: '',
//         birthday: '',
//         phoneNumber: '',
//         studentId: '',
//         degreeProgram: '',
//         enrolledCourses: []
//     })

//     useEffect(() => {
//         const generateStudentId = () => {
//           const randomId = Math.floor(10000000 + Math.random() * 90000000); // 8-digit number
//           setValues((prev) => ({ ...prev, studentId: String(randomId) }));
//         };
      
//         generateStudentId(); // call it once on mount
//       }, []);
      

//     const handleCheckboxChange = (e) => {
//         const { value, checked } = e.target;
//         if (checked) {
//           setValues((prev) => ({
//             ...prev,
//             enrolledCourses: [...prev.enrolledCourses, value],
//           }));
//         } else {
//           setValues((prev) => ({
//             ...prev,
//             enrolledCourses: prev.enrolledCourses.filter((course) => course !== value),
//           }));
//         }
//       };

//       function handleSubmit(e){
//         e.preventDefault()

//         axios.post('/add_user', values)
//         .then((res) => {
//             navigate('/home')
//             console.log(res)
//         })
//         .catch((err) => console.log(err))
//       }

//   return (
//     <div className="min-h-screen" style={{ backgroundColor: '#FBF5DE' }}>
//       <div className="container mx-auto px-6 py-8">
//         <div className="max-w-2xl mx-auto">
//           {/* Header Section */}
//           <div className="mb-8">
//             <h3 className="text-3xl font-bold text-gray-800 mb-4">Add New Student</h3>
//             <Link 
//               to='/home' 
//               className="inline-flex items-center px-4 py-2 text-white font-medium rounded-lg hover:shadow-md transition-shadow duration-200"
//               style={{ backgroundColor: '#3D74B6' }}
//             >
//               ← Back to Home
//             </Link>
//           </div>

//           {/* Form Container */}
//           <div className="bg-white rounded-xl shadow-lg p-8">
//             <form onSubmit={handleSubmit} className="space-y-6">
//               {/* Personal Information Section */}
//               <div className="pb-6 border-b border-gray-200">
//                 <h4 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h4>
                
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
//                       First Name
//                     </label>
//                     <input 
//                       type="text" 
//                       name="firstName" 
//                       id="firstName" 
//                       required 
//                       onChange={(e) => setValues({...values, firstName: e.target.value})}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-colors duration-200"
//                       style={{ focusRingColor: '#3D74B6' }}
//                     />
//                   </div>

//                   <div>
//                     <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
//                       Last Name
//                     </label>
//                     <input 
//                       type="text" 
//                       name="lastName" 
//                       id="lastName" 
//                       required 
//                       onChange={(e) => setValues({...values, lastName: e.target.value})}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-colors duration-200"
//                       style={{ focusRingColor: '#3D74B6' }}
//                     />
//                   </div>
//                 </div>

//                 <div className="mt-6">
//                   <label htmlFor="homeAddress" className="block text-sm font-medium text-gray-700 mb-2">
//                     Home Address
//                   </label>
//                   <input 
//                     type="text" 
//                     name="homeAddress" 
//                     id="homeAddress" 
//                     required 
//                     onChange={(e) => setValues({...values, homeAddress: e.target.value})}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-colors duration-200"
//                     style={{ focusRingColor: '#3D74B6' }}
//                   />
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
//                   <div>
//                     <label htmlFor="emailAddress" className="block text-sm font-medium text-gray-700 mb-2">
//                       Email Address
//                     </label>
//                     <input 
//                       type="email" 
//                       name="emailAddress" 
//                       id="emailAddress" 
//                       required 
//                       onChange={(e) => setValues({...values, emailAddress: e.target.value})}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-colors duration-200"
//                       style={{ focusRingColor: '#3D74B6' }}
//                     />
//                   </div>

//                   <div>
//                     <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
//                       Phone Number
//                     </label>
//                     <input 
//                       type="tel" 
//                       name="phoneNumber" 
//                       id="phoneNumber" 
//                       required 
//                       onChange={(e) => setValues({...values, phoneNumber: e.target.value})}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-colors duration-200"
//                       style={{ focusRingColor: '#3D74B6' }}
//                     />
//                   </div>
//                 </div>

//                 <div className="mt-6">
//                   <label htmlFor="birthday" className="block text-sm font-medium text-gray-700 mb-2">
//                     Birthday
//                   </label>
//                   <input 
//                     type="date" 
//                     name="birthday" 
//                     id="birthday" 
//                     required 
//                     onChange={(e) => setValues({...values, birthday: e.target.value})}
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-colors duration-200"
//                     style={{ focusRingColor: '#3D74B6' }}
//                   />
//                 </div>
//               </div>

//               {/* Academic Information Section */}
//               <div className="pb-6 border-b border-gray-200">
//                 <h4 className="text-lg font-semibold text-gray-800 mb-4">Academic Information</h4>
                
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div>
//                     <label htmlFor="studentId" className="block text-sm font-medium text-gray-700 mb-2">
//                       Student ID
//                     </label>
//                     <input
//                       type="text" 
//                       name="studentId" 
//                       id="studentId" 
//                       value={values.studentId} 
//                       readOnly 
//                       required
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
//                     />
//                   </div>

//                   <div>
//                     <label htmlFor="degreeProgram" className="block text-sm font-medium text-gray-700 mb-2">
//                       Degree Program
//                     </label>
//                     <select 
//                       name="degreeProgram" 
//                       id="degreeProgram" 
//                       required 
//                       onChange={(e) => setValues({...values, degreeProgram: e.target.value})}
//                       className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-colors duration-200"
//                       style={{ focusRingColor: '#3D74B6' }}
//                     >
//                       <option value="">Select Program</option>
//                       <option value="cs">Computer Science</option>
//                       <option value="it">Information Technology</option>
//                       <option value="se">Software Engineering</option>
//                       <option value="ds">Data Science</option>
//                     </select>
//                   </div>
//                 </div>
//               </div>

//               {/* Courses Section */}
//               <div>
//                 <h4 className="text-lg font-semibold text-gray-800 mb-4">Enrolled Courses</h4>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div className="space-y-3">
//                     <label className="flex items-center space-x-3 cursor-pointer group">
//                       <input 
//                         type="checkbox" 
//                         name="enrolledCourses" 
//                         value="java" 
//                         onChange={handleCheckboxChange}
//                         className="w-5 h-5 rounded border-2 border-gray-300 text-blue-600 focus:ring-2 transition-colors duration-200"
//                         style={{ accentColor: '#3D74B6' }}
//                       />
//                       <span className="text-gray-700 group-hover:text-gray-900 transition-colors duration-150">Java Programming</span>
//                     </label>

//                     <label className="flex items-center space-x-3 cursor-pointer group">
//                       <input 
//                         type="checkbox" 
//                         name="enrolledCourses" 
//                         value="python" 
//                         onChange={handleCheckboxChange}
//                         className="w-5 h-5 rounded border-2 border-gray-300 text-blue-600 focus:ring-2 transition-colors duration-200"
//                         style={{ accentColor: '#3D74B6' }}
//                       />
//                       <span className="text-gray-700 group-hover:text-gray-900 transition-colors duration-150">Python Programming</span>
//                     </label>

//                     <label className="flex items-center space-x-3 cursor-pointer group">
//                       <input 
//                         type="checkbox" 
//                         name="enrolledCourses" 
//                         value="figma" 
//                         onChange={handleCheckboxChange}
//                         className="w-5 h-5 rounded border-2 border-gray-300 text-blue-600 focus:ring-2 transition-colors duration-200"
//                         style={{ accentColor: '#3D74B6' }}
//                       />
//                       <span className="text-gray-700 group-hover:text-gray-900 transition-colors duration-150">Figma Design</span>
//                     </label>
//                   </div>

//                   <div className="space-y-3">
//                     <label className="flex items-center space-x-3 cursor-pointer group">
//                       <input 
//                         type="checkbox" 
//                         name="enrolledCourses" 
//                         value="ethicalHacking" 
//                         onChange={handleCheckboxChange}
//                         className="w-5 h-5 rounded border-2 border-gray-300 text-blue-600 focus:ring-2 transition-colors duration-200"
//                         style={{ accentColor: '#3D74B6' }}
//                       />
//                       <span className="text-gray-700 group-hover:text-gray-900 transition-colors duration-150">Ethical Hacking</span>
//                     </label>

//                     <label className="flex items-center space-x-3 cursor-pointer group">
//                       <input 
//                         type="checkbox" 
//                         name="enrolledCourses" 
//                         value="graphicDesign" 
//                         onChange={handleCheckboxChange}
//                         className="w-5 h-5 rounded border-2 border-gray-300 text-blue-600 focus:ring-2 transition-colors duration-200"
//                         style={{ accentColor: '#3D74B6' }}
//                       />
//                       <span className="text-gray-700 group-hover:text-gray-900 transition-colors duration-150">Graphic Designing</span>
//                     </label>

//                     <label className="flex items-center space-x-3 cursor-pointer group">
//                       <input 
//                         type="checkbox" 
//                         name="enrolledCourses" 
//                         value="uxDesign" 
//                         onChange={handleCheckboxChange}
//                         className="w-5 h-5 rounded border-2 border-gray-300 text-blue-600 focus:ring-2 transition-colors duration-200"
//                         style={{ accentColor: '#3D74B6' }}
//                       />
//                       <span className="text-gray-700 group-hover:text-gray-900 transition-colors duration-150">UX/UI Designing</span>
//                     </label>
//                   </div>
//                 </div>
//               </div>

//               {/* Submit Button */}
//               <div className="pt-6">
//                 <button 
//                   type="submit"
//                   className="w-full px-6 py-4 text-white font-semibold text-lg rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
//                   style={{ backgroundColor: '#DC3C22' }}
//                 >
//                   Enroll Student
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   )


// }

// export default Create

import React, {useState, useEffect} from 'react'
import axios from 'axios';
import {Link, useNavigate} from 'react-router-dom'
axios.defaults.baseURL = 'http://localhost:8081';

function Create(){
    const navigate = useNavigate()
    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        homeAddress: '',
        emailAddress: '',
        birthday: '',
        phoneNumber: '',
        studentId: '',
        degreeProgram: '',
        enrolledCourses: []
    })

    // Validation errors state
    const [errors, setErrors] = useState({})

    // Course options based on degree program
    const coursesByProgram = {
        cs: [
            { value: 'algorithms', label: 'Introduction to Algorithms and Data Structures' },
            { value: 'operatingSystems', label: 'Operating Systems' },
            { value: 'computerArchitecture', label: 'Computer Architecture' },
            { value: 'theoryOfComputation', label: 'Theory of Computation' },
            { value: 'computerNetworks', label: 'Computer Networks' }
        ],
        se: [
            { value: 'sdlc', label: 'Software Development Life Cycle (SDLC) & Methodologies (Agile, Scrum)' },
            { value: 'oopDesign', label: 'Object-Oriented Design and Programming' },
            { value: 'softwareTesting', label: 'Software Testing and Quality Assurance' },
            { value: 'versionControl', label: 'Version Control with Git and GitHub' },
            { value: 'projectManagement', label: 'Software Project Management' }
        ],
        it: [
            { value: 'networking', label: 'Computer Networking & TCP/IP' },
            { value: 'systemsAdmin', label: 'Systems Administration (Linux & Windows)' },
            { value: 'cybersecurity', label: 'Cybersecurity Basics' },
            { value: 'cloudComputing', label: 'Cloud Computing (AWS, Azure, or GCP)' },
            { value: 'dbms', label: 'Database Management Systems (DBMS)' }
        ],
        ds: [
            { value: 'pythonDataScience', label: 'Python for Data Science' },
            { value: 'statistics', label: 'Statistics & Probability for Data Analysis' },
            { value: 'dataVisualization', label: 'Data Visualization (using Tableau, Power BI, or Matplotlib)' },
            { value: 'machineLearning', label: 'Machine Learning with scikit-learn or TensorFlow' },
            { value: 'bigData', label: 'Big Data Tools (Hadoop, Spark)' }
        ]
    }

    useEffect(() => {
        const generateStudentId = () => {
          const randomId = Math.floor(10000000 + Math.random() * 90000000); // 8-digit number
          setValues((prev) => ({ ...prev, studentId: String(randomId) }));
        };
      
        generateStudentId(); // call it once on mount
      }, []);

    // Email validation function
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email) && email.includes('.com');
    }

    // Phone number validation function
    const validatePhoneNumber = (phone) => {
        const phoneRegex = /^0\d{9}$/;
        return phoneRegex.test(phone);
    }

    // Age validation function
    const validateAge = (birthday) => {
        const birthYear = new Date(birthday).getFullYear();
        return birthYear <= 2007;
    }

    // Birthday validation function
    const validateBirthday = (birthday) => {
        const birthYear = new Date(birthday).getFullYear();
        return birthYear < 2025;
    }

    // Input validation function
    const validateField = (name, value) => {
        let error = '';
        
        switch (name) {
            case 'emailAddress':
                if (!validateEmail(value)) {
                    error = 'Please enter a valid email address with @ and .com';
                }
                break;
            case 'phoneNumber':
                if (!validatePhoneNumber(value)) {
                    error = 'Phone number must be 10 digits starting with 0 (e.g., 0771794996)';
                }
                break;
            case 'birthday':
                if (!validateBirthday(value)) {
                    error = 'Birth year cannot be 2025 or later';
                } else if (!validateAge(value)) {
                    error = 'Student must be born in 2007 or earlier';
                }
                break;
            default:
                break;
        }
        
        return error;
    }

    // Handle input changes with validation
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setValues({...values, [name]: value});
        
        // Validate field and update errors
        const error = validateField(name, value);
        setErrors(prev => ({
            ...prev,
            [name]: error
        }));
    }

    // Handle degree program change and reset courses
    const handleDegreeProgramChange = (e) => {
        const newProgram = e.target.value;
        setValues({
            ...values, 
            degreeProgram: newProgram,
            enrolledCourses: [] // Reset courses when degree program changes
        });
    }

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
          setValues((prev) => ({
            ...prev,
            enrolledCourses: [...prev.enrolledCourses, value],
          }));
        } else {
          setValues((prev) => ({
            ...prev,
            enrolledCourses: prev.enrolledCourses.filter((course) => course !== value),
          }));
        }
      };

      function handleSubmit(e){
        e.preventDefault()

        // Validate all fields before submission
        const newErrors = {};
        
        if (!validateEmail(values.emailAddress)) {
            newErrors.emailAddress = 'Please enter a valid email address with @ and .com';
        }
        
        if (!validatePhoneNumber(values.phoneNumber)) {
            newErrors.phoneNumber = 'Phone number must be 10 digits starting with 0 (e.g., 0771794996)';
        }
        
        if (!validateBirthday(values.birthday)) {
            newErrors.birthday = 'Birth year cannot be 2025 or later';
        } else if (!validateAge(values.birthday)) {
            newErrors.birthday = 'Student must be born in 2007 or earlier';
        }

        setErrors(newErrors);

        // If there are validation errors, don't submit
        if (Object.keys(newErrors).length > 0) {
            return;
        }

        axios.post('/add_user', values)
        .then((res) => {
            navigate('/home')
            console.log(res)
        })
        .catch((err) => console.log(err))
      }

      // Get available courses for selected degree program
      const getAvailableCourses = () => {
        return coursesByProgram[values.degreeProgram] || [];
      }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FBF5DE' }}>
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-2xl mx-auto">
          {/* Header Section */}
          <div className="mb-8">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">Add New Student</h3>
            <Link 
              to='/home' 
              className="inline-flex items-center px-4 py-2 text-white font-medium rounded-lg hover:shadow-md transition-shadow duration-200"
              style={{ backgroundColor: '#3D74B6' }}
            >
              ← Back to Home
            </Link>
          </div>

          {/* Form Container */}
          <div className="bg-white rounded-xl shadow-lg p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information Section */}
              <div className="pb-6 border-b border-gray-200">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <input 
                      type="text" 
                      name="firstName" 
                      id="firstName" 
                      required 
                      onChange={(e) => setValues({...values, firstName: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-colors duration-200"
                      style={{ focusRingColor: '#3D74B6' }}
                    />
                  </div>

                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input 
                      type="text" 
                      name="lastName" 
                      id="lastName" 
                      required 
                      onChange={(e) => setValues({...values, lastName: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-colors duration-200"
                      style={{ focusRingColor: '#3D74B6' }}
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <label htmlFor="homeAddress" className="block text-sm font-medium text-gray-700 mb-2">
                    Home Address
                  </label>
                  <input 
                    type="text" 
                    name="homeAddress" 
                    id="homeAddress" 
                    required 
                    onChange={(e) => setValues({...values, homeAddress: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-colors duration-200"
                    style={{ focusRingColor: '#3D74B6' }}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div>
                    <label htmlFor="emailAddress" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input 
                      type="email" 
                      name="emailAddress" 
                      id="emailAddress" 
                      required 
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-colors duration-200 ${
                        errors.emailAddress ? 'border-red-500' : 'border-gray-300'
                      }`}
                      style={{ focusRingColor: '#3D74B6' }}
                    />
                    {errors.emailAddress && (
                      <p className="text-red-500 text-sm mt-1">{errors.emailAddress}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input 
                      type="tel" 
                      name="phoneNumber" 
                      id="phoneNumber" 
                      required 
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-colors duration-200 ${
                        errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                      }`}
                      style={{ focusRingColor: '#3D74B6' }}
                      placeholder="0771794996"
                    />
                    {errors.phoneNumber && (
                      <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
                    )}
                  </div>
                </div>

                <div className="mt-6">
                  <label htmlFor="birthday" className="block text-sm font-medium text-gray-700 mb-2">
                    Birthday
                  </label>
                  <input 
                    type="date" 
                    name="birthday" 
                    id="birthday" 
                    required 
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-colors duration-200 ${
                      errors.birthday ? 'border-red-500' : 'border-gray-300'
                    }`}
                    style={{ focusRingColor: '#3D74B6' }}
                  />
                  {errors.birthday && (
                    <p className="text-red-500 text-sm mt-1">{errors.birthday}</p>
                  )}
                </div>
              </div>

              {/* Academic Information Section */}
              <div className="pb-6 border-b border-gray-200">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Academic Information</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="studentId" className="block text-sm font-medium text-gray-700 mb-2">
                      Student ID
                    </label>
                    <input
                      type="text" 
                      name="studentId" 
                      id="studentId" 
                      value={values.studentId} 
                      readOnly 
                      required
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-600"
                    />
                  </div>

                  <div>
                    <label htmlFor="degreeProgram" className="block text-sm font-medium text-gray-700 mb-2">
                      Degree Program
                    </label>
                    <select 
                      name="degreeProgram" 
                      id="degreeProgram" 
                      required 
                      onChange={handleDegreeProgramChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent transition-colors duration-200"
                      style={{ focusRingColor: '#3D74B6' }}
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

              {/* Courses Section */}
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Enrolled Courses</h4>
                {values.degreeProgram ? (
                  <div className="space-y-3">
                    {getAvailableCourses().map((course) => (
                      <label key={course.value} className="flex items-start space-x-3 cursor-pointer group">
                        <input 
                          type="checkbox" 
                          name="enrolledCourses" 
                          value={course.value} 
                          onChange={handleCheckboxChange}
                          checked={values.enrolledCourses.includes(course.value)}
                          className="w-5 h-5 mt-1 rounded border-2 border-gray-300 text-blue-600 focus:ring-2 transition-colors duration-200"
                          style={{ accentColor: '#3D74B6' }}
                        />
                        <span className="text-gray-700 group-hover:text-gray-900 transition-colors duration-150 flex-1">
                          {course.label}
                        </span>
                      </label>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 italic">Please select a degree program first to see available courses.</p>
                )}
              </div>

              {/* Submit Button */}
              <div className="pt-6">
                <button 
                  type="submit"
                  className="w-full px-6 py-4 text-white font-semibold text-lg rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
                  style={{ backgroundColor: '#DC3C22' }}
                >
                  Enroll Student
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )


}

export default Create