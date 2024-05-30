

// import React, { useState, useEffect } from 'react';

// function LeaveRequest() {
//   const [leaveRequests, setLeaveRequests] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [message, setMessage] = useState('');

//   useEffect(() => {
//     const token = sessionStorage.getItem('token');

//     const fetchLeaveRequests = async () => {
//       try {
//         const response = await fetch('https://localhost:7198/leave-requests', {
//           method: 'GET',
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         });
//         const data = await response.json();
//         setLeaveRequests(data);
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching leave requests:', error);
//         setLoading(false);
//       }
//     };

//     fetchLeaveRequests();
//   }, []);

//   const approveLeaveRequest = async (employeeID) => {
//     const token = sessionStorage.getItem('token');
//     try {
//       const response = await fetch(`https://localhost:7198/api/ManagerLeaveRequest/employees/${employeeID}/leave-requests/approve`, {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });
//       const data = await response.json();
//       console.log('Approved leave request:', data);
//       setMessage('Leave request approved successfully.');
//       // Optionally update the UI or fetch leave requests again after approval
//     } catch (error) {
//       console.error('Error approving leave request:', error);
//       setMessage('Error approving leave request.');
//     }
//   };

//   const rejectLeaveRequest = async (employeeID) => {
//     const token = sessionStorage.getItem('token');
//     try {
//       const response = await fetch(`https://localhost:7198/api/ManagerLeaveRequest/employees/${employeeID}/leave-requests/reject`, {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`
//         }
//       });
//       const data = await response.json();
//       console.log('Rejected leave request:', data);
//       setMessage('Leave request rejected successfully.');
//       // Optionally update the UI or fetch leave requests again after rejection
//     } catch (error) {
//       console.error('Error rejecting leave request:', error);
//       setMessage('Error rejecting leave request.');
//     }
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div className="containers mt-5">
//       <h3>Leave Requests</h3>
//       <ul className="list-group">
//         {leaveRequests.map(request => (
//           <li key={request.leaveRequestID} className="list-group-item">
//             <div className="row">
//               <div className="col-md-2">
//                 <strong>Employee ID:</strong> {request.employeeID}
//               </div>
//               <div className="col-md-2">
//                 <strong>Leave Type:</strong> {request.leaveType}
//               </div>
//               <div className="col-md-2">
//                 <strong>Start Date:</strong> {new Date(request.startDate).toLocaleDateString()}
//               </div>
//               <div className="col-md-2">
//                 <strong>End Date:</strong> {new Date(request.endDate).toLocaleDateString()}
//               </div>
//               <div className="col-md-2">
//                 <strong>Status:</strong> {request.status}
//               </div>
//               <div className="col-md-2">
//                 <button className="btn btn-success me-2" onClick={() => approveLeaveRequest(request.employeeID)}>Approve</button>
//                 <button className="btn btn-danger" onClick={() => rejectLeaveRequest(request.employeeID)}>Reject</button>
//               </div>
//             </div>
//           </li>
//         ))}
//       </ul>
//       {message && (
//         <div className="alert alert-success mt-3" role="alert">
//           {message}
//         </div>
//       )}
//     </div>
//   );
// };

// export default LeaveRequest;

import React, { useState, useEffect } from 'react';

function LeaveRequest() {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const token = sessionStorage.getItem('token');

    const fetchLeaveRequests = async () => {
      try {
        const response = await fetch('https://localhost:7198/leave-requests', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        setLeaveRequests(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching leave requests:', error);
        setLoading(false);
      }
    };

    fetchLeaveRequests();
  }, []);

  const approveLeaveRequest = async (employeeID) => {
    const token = sessionStorage.getItem('token');
    try {
      const response = await fetch(`https://localhost:7198/api/ManagerLeaveRequest/employees/${employeeID}/leave-requests/approve`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
    
      setMessage('Leave request approved successfully.');
      // Remove the approved request from the state
      setLeaveRequests(leaveRequests.filter(request => request.employeeID !== employeeID));
    } catch (error) {
      console.error('Error approving leave request:', error);
      setMessage('Error approving leave request.');
    }
  };

  const rejectLeaveRequest = async (employeeID) => {
    const token = sessionStorage.getItem('token');
    try {
      const response = await fetch(`https://localhost:7198/api/ManagerLeaveRequest/employees/${employeeID}/leave-requests/reject`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
     
      setMessage('Leave request rejected successfully.');
      // Remove the rejected request from the state
      setLeaveRequests(leaveRequests.filter(request => request.employeeID !== employeeID));
    } catch (error) {
      console.error('Error rejecting leave request:', error);
      setMessage('Error rejecting leave request.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="containers mt-5">
      <h3>Leave Requests</h3>
      <ul className="list-group">
        {leaveRequests.map(request => (
          <li key={request.leaveRequestID} className="list-group-item">
            <div className="row">
              <div className="col-md-2">
                <strong>Employee ID:</strong> {request.employeeID}
              </div>
              <div className="col-md-2">
                <strong>Leave Type:</strong> {request.leaveType}
              </div>
              <div className="col-md-2">
                <strong>Start Date:</strong> {new Date(request.startDate).toLocaleDateString()}
              </div>
              <div className="col-md-2">
                <strong>End Date:</strong> {new Date(request.endDate).toLocaleDateString()}
              </div>
              <div className="col-md-2">
                <strong>Status:</strong> {request.status}
              </div>
              <div className="col-md-2">
                <button className="btn btn-success me-2" onClick={() => approveLeaveRequest(request.employeeID)}>Approve</button>
                <button className="btn btn-danger" onClick={() => rejectLeaveRequest(request.employeeID)}>Reject</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {message && (
        <div className="alert alert-success mt-3" role="alert">
          {message}
        </div>
      )}
    </div>
  );
};

export default LeaveRequest;
