

// import React, { useState, useEffect } from 'react';

// const AddLeaveRequest = () => {
//   const [employeeId, setEmployeeId] = useState('');
//   const [leaveType, setLeaveType] = useState('');
//   const [startDate, setStartDate] = useState('');
//   const [endDate, setEndDate] = useState('');
//   const [response, setResponse] = useState(null);
//   const [token, setToken] = useState('');
//   const [showResponse, setShowResponse] = useState(false);

//   useEffect(() => {
//     const storedEmployeeId = sessionStorage.getItem('employeeID');
//     if (storedEmployeeId) {
//       setEmployeeId(storedEmployeeId);
//     }

//     const storedToken = sessionStorage.getItem('token');
//     if (storedToken) {
//       setToken(storedToken);
//     }
//   }, []);

//   const handleSubmit = (e) => {
//     e.preventDefault();

   

//     const url = `https://localhost:7198/api/EmployeeLeaveRequest/request?employeeId=${employeeId}&leaveType=${leaveType}&startDate=${startDate}&endDate=${endDate}`;

//     const requestOptions = {
//       method: 'POST',
//       headers: {
//         'Accept': 'application/json',
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`
//       }
//     };

//     fetch(url, requestOptions)
//       .then(response => response.json())
//       .then(data => {
//         setResponse(data);
//         setShowResponse(true);
//       })
//       .catch(error => console.error('Error:', error));
//   };

//   const handleFetchRequests = () => {
//     fetch(`https://localhost:7198/api/EmployeeLeaveRequest/${employeeId}/leave-requests`, {
//       headers: {
//         'Authorization': `Bearer ${token}`,
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//       }
//     })
//       .then(response => {
//         if (!response.ok) {
//           throw new Error('Network response was not ok');
//         }
//         return response.json();
//       })
//       .then(data => {
//         setResponse(data);
//         setShowResponse(true);
//       })
//       .catch(error => console.error('Error:', error));
//   };

//   const handleCancel = () => {
//     setShowResponse(false);
//   };

//   return (
//     <div className="containers mt-5">
//       <div className="row justify-content-center">
//         <div className="col-md-6">
//           <div className="cards mb-4">
//             <div className="cards-body">
//               <h3 className="cards-title">Request Leave</h3>
//               <form onSubmit={handleSubmit}>
//                 <div className="mb-3">
//                   <label htmlFor="leaveType" className="form-label">Leave Type:</label>
//                   <input type="text" className="form-control" id="leaveType" value={leaveType} onChange={(e) => setLeaveType(e.target.value)} />
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="startDate" className="form-label">Start Date:</label>
//                   <input type="date" className="form-control" id="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
//                 </div>
//                 <div className="mb-3">
//                   <label htmlFor="endDate" className="form-label">End Date:</label>
//                   <input type="date" className="form-control" id="endDate" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
//                 </div>
//                 <button type="submit" className="btn btn-primary">Submit</button>
//               </form>
//             </div>
//           </div>
//           <div className="cards">
//             <div className="card-body">
//               <h3 className="card-title">Leave Requests</h3>
            
//               <button onClick={handleFetchRequests} className="btn btn-primary mb-3">Fetch Leave Requests</button>
//               {showResponse && response && response.length > 0 ? (
//                 <div>
//                   <h3>Leave Requests:</h3>
//                   <ul className="list-group">
//                     {response.map(request => (
//                       <li key={request.leaveRequestID} className="list-group-item">
//                         <strong>Leave Type:</strong> {request.leaveType}<br />
//                         <strong>Start Date:</strong> {request.startDate}<br />
//                         <strong>End Date:</strong> {request.endDate}<br />
//                         <strong>Status:</strong> {request.status}
//                       </li>
//                     ))}
//                   </ul>
//                   <button onClick={handleCancel} className="btn btn-secondary mt-3">Hide Response</button>
//                 </div>
//               ) : (
//                 <p>No leave requests found.</p>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddLeaveRequest;

import React, { useState, useEffect } from 'react';

const AddLeaveRequest = () => {
  const [employeeId, setEmployeeId] = useState('');
  const [leaveType, setLeaveType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [response, setResponse] = useState(null);
  const [token, setToken] = useState('');
  const [showResponse, setShowResponse] = useState(false);

  useEffect(() => {
    const storedEmployeeId = sessionStorage.getItem('employeeID');
    if (storedEmployeeId) {
      setEmployeeId(storedEmployeeId);
    }

    const storedToken = sessionStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const url = `https://localhost:7198/api/EmployeeLeaveRequest/request?employeeId=${employeeId}&leaveType=${leaveType}&startDate=${startDate}&endDate=${endDate}`;

    const requestOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    };

    fetch(url, requestOptions)
      .then(response => response.json())
      .then(data => {
        if (data && data.error) {
          throw new Error(data.error);
        }
        setResponse(data);
        setShowResponse(true);
        alert('Leave request submitted successfully!');
      })
      .catch(error => {
        // Show alert to the user
        alert(error.message);
      });
  };

  const handleFetchRequests = () => {
    fetch(`https://localhost:7198/api/EmployeeLeaveRequest/${employeeId}/leave-requests`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        if (data && data.error) {
          throw new Error(data.error);
        }
        setResponse(data);
        setShowResponse(true);
      })
      .catch(error => {
        // Show alert to the user
        alert(error.message);

      });
  };

  const handleCancel = () => {
    setShowResponse(false);
  };

  return (
    <div className="containers mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="cards mb-4">
            <div className="cards-body">
              <h3 className="cards-title">Request Leave</h3>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="leaveType" className="form-label">Leave Type:</label>
                  <input type="text" className="form-control" id="leaveType" value={leaveType} onChange={(e) => setLeaveType(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label htmlFor="startDate" className="form-label">Start Date:</label>
                  <input type="date" className="form-control" id="startDate" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label htmlFor="endDate" className="form-label">End Date:</label>
                  <input type="date" className="form-control" id="endDate" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
              </form>
            </div>
          </div>
          <div className="cards">
            <div className="card-body">
              <h3 className="card-title">Leave Requests</h3>
            
              <button onClick={handleFetchRequests} className="btn btn-primary mb-3">Fetch Leave Requests</button>
              {showResponse && response && response.length > 0 ? (
                <div>
                  <h3>Leave Requests:</h3>
                  <ul className="list-group">
                    {response.map(request => (
                      <li key={request.leaveRequestID} className="list-group-item">
                        <strong>Leave Type:</strong> {request.leaveType}<br />
                        <strong>Start Date:</strong> {request.startDate}<br />
                        <strong>End Date:</strong> {request.endDate}<br />
                        <strong>Status:</strong> {request.status}
                      </li>
                    ))}
                  </ul>
                  <button onClick={handleCancel} className="btn btn-secondary mt-3">Hide Response</button>
                </div>
              ) : (
                <p>No leave requests found.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddLeaveRequest;

