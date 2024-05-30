// import React, { useState, useEffect } from 'react';

// const ManagerProfile = () => {
//   const [managerId, setManagerId] = useState(1);
//   const [newName, setNewName] = useState('');
//   const [newPhone, setNewPhone] = useState('');
//   const [response, setResponse] = useState(null);
//   const [managers, setManagers] = useState([]);
//   const [showManagers, setShowManagers] = useState(false); // State to control visibility of managers list

//   useEffect(() => {
//     fetchAllManagers();
//   }, []);

//   const fetchAllManagers = () => {
//     fetch('https://localhost:7198/api/Manager/GetAllManager')
//       .then(response => response.json())
//       .then(data => {
//         setManagers(data);
//       })
//       .catch(error => console.error('Error:', error));
//   };

//   const handlePhoneSubmit = (e) => {
//     e.preventDefault();

//     const requestOptions = {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//     };

//     fetch(`https://localhost:7198/api/Manager/${managerId}/change-phone?phone=${newPhone}`, requestOptions)
//       .then(response => response.json())
//       .then(data => {
//         setResponse(data);
//       })
//       .catch(error => console.error('Error:', error));
//   };

//   const handleNameSubmit = (e) => {
//     e.preventDefault();

//     const requestOptions = {
//       method: 'PUT',
//       headers: { 'Content-Type': 'application/json' },
//     };

//     fetch(`https://localhost:7198/api/Manager/${managerId}/change-name?name=${newName}`, requestOptions)
//       .then(response => response.json())
//       .then(data => {
//         setResponse(data);
//       })
//       .catch(error => console.error('Error:', error));
//   };

//   return (
//     <div className="containers mt-5">
//       <div className="row justify-content-center">
//         <div className="col-md-6">
//           <div className="cards">
//             <div className="card-body">
//               <h2 className="card-title">Update Manager Information</h2>
//               <form onSubmit={handlePhoneSubmit}>
//                 <div className="mb-3">
//                   <label htmlFor="managerId" className="form-label">Manager ID:</label>
//                   <input type="number" className="form-control" id="managerId" value={managerId} onChange={(e) => setManagerId(e.target.value)} />
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="newPhone" className="form-label">New Phone Number:</label>
//                   <input type="tel" className="form-control" id="newPhone" value={newPhone} onChange={(e) => setNewPhone(e.target.value)} />
//                 </div>
//                 <button type="submit" className="btn btn-primary">Update Phone Number</button>
//               </form>
//               <hr />
//               <form onSubmit={handleNameSubmit}>
//                 <div className="mb-3">
//                   <label htmlFor="newName" className="form-label">New Name:</label>
//                   <input type="text" className="form-control" id="newName" value={newName} onChange={(e) => setNewName(e.target.value)} />
//                 </div>
//                 <button type="submit" className="btn btn-primary">Update Name</button>
//               </form>
//               {response && (
//                 <div className="mt-3">
//                   <h3>Response:</h3>
//                   <pre>{JSON.stringify(response, null, 2)}</pre>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="mt-5">
//       <h2>All Managers</h2>
//       <ul className="list-group">
//         {managers.map(manager => (
//           <li key={manager.managerID} className="list-group-item">
//             <div>
//               <strong>Name:</strong> {manager.name}
//             </div>
//             <div>
//               <strong>Email:</strong> {manager.email}
//             </div>
//             <div>
//               <strong>Phone:</strong> {manager.phone}
//             </div>
//             <button className="btn btn-primary mt-2" onClick={() => handleManagerClick(manager.managerID)}>Update Manager</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//     </div>
//   );
// };

// export default ManagerProfile;


import React, { useState, useEffect } from 'react';

const ManagerProfile = () => {
  const [managerId, setManagerId] = useState(1);
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [response, setResponse] = useState(null);
  const [managers, setManagers] = useState([]);
  const [showManagers, setShowManagers] = useState(false); // State to control the display of managers
  const [token, setToken] = useState('');
  const [userType, setUserType] = useState('');

  useEffect(() => {
    const storedManagerId = sessionStorage.getItem('managerID');
    const storedToken = sessionStorage.getItem('token');
    const storedUserType = sessionStorage.getItem('userType');

    if (storedManagerId) {
      setManagerId(parseInt(storedManagerId)); // Convert to number if necessary
    }

    if (storedToken) {
      setToken(storedToken);
    }

    if (storedUserType) {
      setUserType(storedUserType);
    }

    
  }, []);

  
  const handlePhoneSubmit = (e) => {
    e.preventDefault();

    const requestOptions = {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    };

    fetch(`https://localhost:7198/api/Manager/${managerId}/change-phone?phone=${newPhone}`, requestOptions)
      .then(response => response.json())
      .then(data => {
        setResponse(data);
      })
      .catch(error => console.error('Error:', error));
  };

  const handleNameSubmit = (e) => {
    e.preventDefault();

    const requestOptions = {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    };

    fetch(`https://localhost:7198/api/Manager/${managerId}/change-name?name=${newName}`, requestOptions)
      .then(response => response.json())
      .then(data => {
        setResponse(data);
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <div className="containers mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title">Update Manager Information</h3>
              <form onSubmit={handlePhoneSubmit}>
               
                <div className="mb-3">
                  <label htmlFor="newPhone" className="form-label">New Phone Number:</label>
                  <input type="tel" className="form-control" id="newPhone" value={newPhone} onChange={(e) => setNewPhone(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary">Update Phone Number</button>
              </form>
              <hr />
              <form onSubmit={handleNameSubmit}>
                <div className="mb-3">
                  <label htmlFor="newName" className="form-label">New Name:</label>
                  <input type="text" className="form-control" id="newName" value={newName} onChange={(e) => setNewName(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary">Update Name</button>
              </form>
              {response && (
                <div className="mt-3">
                  <h3>Response:</h3>
                  <pre>{JSON.stringify(response, null, 2)}</pre>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default ManagerProfile;


