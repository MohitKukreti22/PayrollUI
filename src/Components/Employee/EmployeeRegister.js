

// import React, { useState } from 'react';
// import './EmployeeRegister.css'; // Import CSS file for styling
// import { useNavigate } from 'react-router-dom';
// const EmployeeRegister = () => {
//   const navigate = useNavigate();
  
//   const [formData, setFormData] = useState({
//     email: '',
//     password: '',
//     userType: 'Employee',
//     username: '',
//     dateOfBirth: '',
//     joiningDate: '',
//     department: '',
//     position: '',
//     contactNumber: '',
//     address: '',
//     bankDetails: '',
//     taxInformation: ''
//   });
//   const [response, setResponse] = useState(null);
//   const [formErrors, setFormErrors] = useState({}); // State for form validation errors

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prevState => ({
//       ...prevState,
//       [name]: value

      
//     }));
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Validate form fields
//     const errors = {};
//     Object.keys(formData).forEach((key) => {
//       if (!formData[key]) {
//         errors[key] = 'This field is required';
//       }
//     });
//     setFormErrors(errors);

//     // Submit form if no errors
//     if (Object.keys(errors).length === 0) {
//       fetch('https://localhost:7198/api/Employee/Register', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'accept': 'application/json'
//         },
//         body: JSON.stringify(formData)
//       })
//         .then(response => response.json())
//         .then(data => {
//           setResponse(data);
//           navigate('/login');
//           window.alert('Employee registered successfully!');
//         })
//         .catch(error => console.error('Error:', error));
//     }
    
//   };

//   return (
//     <div className="containerss mt-5">
//       <h3>Employee Registration</h3>
//       <form onSubmit={handleSubmit} className="registration-form">
//         <div className="form-group">
//           <label>Email</label>
//           <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter Email" required />
//           {formErrors.email && <span className="error-message">{formErrors.email}</span>}
//         </div>
//         <div className="form-group">
//           <label>Password</label>
//           <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter Password" required />
//           {formErrors.password && <span className="error-message">{formErrors.password}</span>}
//         </div>
//         <div className="form-group">
//           <label>Name</label>
//           <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Enter Name" required />
//           {formErrors.username && <span className="error-message">{formErrors.username}</span>}
//         </div>

//         <div className="form-group">
//           <label>Date of Birth</label>
//           <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
//           {formErrors.dateOfBirth && <span className="error-message">{formErrors.dateOfBirth}</span>}
//         </div>
//         <div className="form-group">
//           <label>Joining Date</label>
//           <input type="date" name="joiningDate" value={formData.joiningDate} onChange={handleChange} required />
//           {formErrors.joiningDate && <span className="error-message">{formErrors.joiningDate}</span>}
//         </div>
//         <div className="form-group">
//           <label>Department</label>
//           <input type="text" name="department" value={formData.department} onChange={handleChange} placeholder="Enter Department" required />
//           {formErrors.department && <span className="error-message">{formErrors.department}</span>}
//         </div>
//         <div className="form-group">
//           <label>Position</label>
//           <input type="text" name="position" value={formData.position} onChange={handleChange} placeholder="Enter Position" required />
//           {formErrors.position && <span className="error-message">{formErrors.position}</span>}
//         </div>
//         <div className="form-group">
//           <label>Contact Number</label>
//           <input type="tel" name="contactNumber" value={formData.contactNumber} onChange={handleChange} placeholder="Enter Contact Number" required />
//           {formErrors.contactNumber && <span className="error-message">{formErrors.contactNumber}</span>}
//         </div>
//         <div className="form-group">
//           <label>Address</label>
//           <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Enter Address" required />
//           {formErrors.address && <span className="error-message">{formErrors.address}</span>}
//         </div>
//         <div className="form-group">
//           <label>Bank Details</label>
//           <input type="text" name="bankDetails" value={formData.bankDetails} onChange={handleChange} placeholder="Enter Bank Details" required />
//           {formErrors.bankDetails && <span className="error-message">{formErrors.bankDetails}</span>}
//         </div>
//         <div className="form-group">
//           <label>Tax Information</label>
//           <input type="text" name="taxInformation" value={formData.taxInformation} onChange={handleChange} placeholder="Enter Tax Information" required />
//           {formErrors.taxInformation && <span className="error-message">{formErrors.taxInformation}</span>}
//         </div>
//         <input type="submit" value="Register" className="btn btn-primary" />
//       </form>
//       {response && (
//         <div className="mt-3">
//           <h3>Response:</h3>
//           <pre>{JSON.stringify(response, null, 2)}</pre>
//         </div>
//       )}
//     </div>
//   );
// };

// export default EmployeeRegister;
import React, { useState } from 'react';
import './EmployeeRegister.css';
import { useNavigate } from 'react-router-dom';

const EmployeeRegister = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: 'Employee',
    username: '',
    dateOfBirth: '',
    joiningDate: '',
    department: '',
    position: '',
    contactNumber: '',
    address: '',
    bankDetails: '',
    taxInformation: ''
  });
  const [response, setResponse] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = {};

    if (!formData.email || !formData.email.includes('@')) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!formData.password || formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }

    // Date of birth validation
    const dob = new Date(formData.dateOfBirth);
    const ageDiffMs = Date.now() - dob.getTime();
    const ageDate = new Date(ageDiffMs);
    const age = Math.abs(ageDate.getUTCFullYear() - 1970);

    if (isNaN(dob.getTime()) || age < 18) {
      errors.dateOfBirth = 'You must be at least 18 years old';
    }

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      // Submit form if no errors
      fetch('https://localhost:7198/api/Employee/Register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json'
        },
        body: JSON.stringify(formData)
      })
        .then(response => response.json())
        .then(data => {
          setResponse(data);
          navigate('/login');
          window.alert('Employee registered successfully!');
        })
        .catch(error => console.error('Error:', error));
    }
  };

  return (
    <div className="containerss mt-5">
      <h3>Employee Registration</h3>
      <form onSubmit={handleSubmit} className="registration-form">
        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter Email" required />
          {formErrors.email && <span className="error-message">{formErrors.email}</span>}
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Enter Password" required />
          {formErrors.password && <span className="error-message">{formErrors.password}</span>}
        </div>
        <div className="form-group">
          <label>Name</label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} placeholder="Enter Name" required />
        </div>
        <div className="form-group">
          <label>Date of Birth</label>
          <input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} required />
          {formErrors.dateOfBirth && <span className="error-message">{formErrors.dateOfBirth}</span>}
        </div>
        <div className="form-group">
          <label>Joining Date</label>
          <input type="date" name="joiningDate" value={formData.joiningDate} onChange={handleChange} required />
          {formErrors.joiningDate && <span className="error-message">{formErrors.joiningDate}</span>}
        </div>
        <div className="form-group">
          <label>Department</label>
          <input type="text" name="department" value={formData.department} onChange={handleChange} placeholder="Enter Department" required />
          {formErrors.department && <span className="error-message">{formErrors.department}</span>}
        </div>
        <div className="form-group">
          <label>Position</label>
          <input type="text" name="position" value={formData.position} onChange={handleChange} placeholder="Enter Position" required />
          {formErrors.position && <span className="error-message">{formErrors.position}</span>}
        </div>
        <div className="form-group">
          <label>Contact Number</label>
          <input type="tel" name="contactNumber" value={formData.contactNumber} onChange={handleChange} placeholder="Enter Contact Number" required />
          {formErrors.contactNumber && <span className="error-message">{formErrors.contactNumber}</span>}
        </div>
        <div className="form-group">
          <label>Address</label>
          <input type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Enter Address" required />
          {formErrors.address && <span className="error-message">{formErrors.address}</span>}
        </div>
        <div className="form-group">
          <label>Bank Details</label>
          <input type="text" name="bankDetails" value={formData.bankDetails} onChange={handleChange} placeholder="Enter Bank Details" required />
          {formErrors.bankDetails && <span className="error-message">{formErrors.bankDetails}</span>}
        </div>
        <div className="form-group">
          <label>Tax Information</label>
          <input type="text" name="taxInformation" value={formData.taxInformation} onChange={handleChange} placeholder="Enter Tax Information" required />
          {formErrors.taxInformation && <span className="error-message">{formErrors.taxInformation}</span>}
        </div>
        <input type="submit" value="Register" className="btn btn-primary" />
      </form>
      {response && (
        <div className="mt-3">
          <h3>Response:</h3>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default EmployeeRegister;
       